import MailSchedule  from '../models/mailSchedule.model.js';
import redisClient from '../config/redisClient.js';
import mailQueue from '../utils/mailQueue.utils.js';

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateCronExpression } from '../utils/cron-expression.utils.js';

export const scheduleMail = asyncHandler(async(req, res) => {
    let { senderEmail, receiverEmails, subject, text, frequency, sendTime, endDate } = req.body;

  try {
    const filePath = req.file ? req.file.path : null;

    const { cronExpression, isScheduledTimeLargerThanCurrentTime } = generateCronExpression(frequency, sendTime);

    const job = await mailQueue.add(
      {
        senderEmail,
        receiverEmails,
        subject,
        text,
        filePath,
      },
      {
        repeat: { cron: cronExpression, endDate: new Date(endDate) },
      }
    );

   
    if(!isScheduledTimeLargerThanCurrentTime){
        return res.status(500).json(new ApiError(401, {},"Failed to schedule mail, Invalid time"));
    }
 
    const mailSchedule = await MailSchedule.create({
      senderEmail,
      receiverEmails,
      subject,
      text,
      filePath,
      schedule:cronExpression,
      endDate,
      jobId: job.id, // Store Bull job ID
    });

    await redisClient.hSet('jobs', job.id, JSON.stringify(mailSchedule));

    return res.status(201).json(new ApiResponse(201,{jobId: job.id},'Mail scheduled successfully'));

  } catch (error) {
    return res.status(500).json(new ApiError(500, error, error.message ));
  }

});

export const cancelMail = asyncHandler(async(req, res) => {

  const { jobId } = req.params;

  try {

    console.log("Cancelling Body: " + jobId);

    // retrieve job details from redis
    const jobData = await redisClient.hGet('jobs', jobId);

    if (!jobData) {
      return res.status(404).json(new ApiError(404, {}, "Job not found"));
    }

    const job = await mailQueue.getJob(jobId);

    if(!job){
      return res.status(404).json(new ApiError(404, {}, "Job not found"));
    }

     // Remove the job from Bull queue
     await job.remove();

     // Remove job details from Redis
     await redisClient.hDel('jobs', jobId);

     // Remove job details from MongoDB
     await MailSchedule.findOneAndDelete({ jobId });

    // if (job) {
    //   await job.remove();
    //   await MailSchedule.findOneAndDelete({ jobId });
    //   await redisClient.hDel('jobs', job.id);
    //   return res.status(201).json(new ApiResponse(201,{jobId: job.id},'Mail scheduled successfully'));
    // } else {
    //   return res.status(404).json(new ApiError(500, job, "Job not found" ));
    // } 
    return res.status(200).json(new ApiResponse(200, {}, 'Mail schedule canceled successfully'));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error, error.message ));
  }
});

//while testing this api call, sometimes making issues
export const listScheduledMails = asyncHandler(async(req, res) => {
  try {
    const { senderEmail } = req.query;

    const jobs = await redisClient.hGetAll('jobs');

    const filteredJobs = Object.values(jobs || {}).filter(job => JSON.parse(job).senderEmail === senderEmail);
    console.log("LOGGGG: ",filteredJobs)

    const responseMessage = filteredJobs.length === 0 
    ? "No data found with the given email ID."
    : "Filtered data found.";

  return res.status(filteredJobs.length === 0 ? 404 : 200).json(new ApiResponse(filteredJobs.length === 0 ? 404 : 200, responseMessage, filteredJobs.length === 0 ? undefined : filteredJobs.map(job => JSON.parse(job))));

    //return res.status(200).json(new ApiResponse(200,filteredJobs.map(job => JSON.parse(job)),(filteredJobs == null ? "data found with your given mail id." : "filtered data found.")));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error, error.message ));
  }
});


export default{
  scheduleMail,
  cancelMail,
  listScheduledMails
}



