import MailSchedule  from '../models/mailSchedule.model.js';
import redisClient from '../config/redisClient.js';
import mailQueue from '../utils/mailQueue.utils.js';

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { upload } from '../middlewares/multer.middleware.js';


let isScheduledTimeLargerThanCurrentTime;
const generateCronExpression = (frequency, sendTime) => {
  console.log("=======> Setime : ", sendTime);

  if (!sendTime) {
    throw new ApiError(400, "Invalid send time and send time is required.");
  }

  const [hour, minute] = sendTime.split(':').map(Number);
  const scheduleDate = new Date();
  scheduleDate.setHours(hour, minute, 0, 0);

  const isScheduledTimeLargerThanCurrentTime = scheduleDate.getTime() > Date.now();

  const cronMinute = minute || 0;
  let cronExpression;

  if (frequency.endsWith('day')) {
    const days = parseInt(frequency);
    cronExpression = `${cronMinute} ${hour} */${days} * *`;
  } else if (frequency.endsWith('week')) {
    const weeks = parseInt(frequency);
    cronExpression = `${cronMinute} ${hour} * * ${Array.from({ length: 7 }, (_, i) => i % weeks === 0 ? i : null).filter(i => i !== null).join(',')}`;
  } else if (frequency.endsWith('month')) {
    const months = parseInt(frequency);
    cronExpression = `${cronMinute} ${hour} 1 */${months} *`;
  } else {
    throw new Error('Invalid frequency');
  }

  return { cronExpression, isScheduledTimeLargerThanCurrentTime };
};

export const scheduleMail = asyncHandler(async(req, res) => {
    let { senderEmail, receiverEmails, subject, text, frequency, sendTime, endDate } = req.body;

    console.log("BODY : ", req.body)

  try {
    const filePath = req.file ? req.file.path : null;
    // const { schedule, isScheduledTimeLargerThanCurrentTime } = generateCronExpression(frequency, sendTime);
    // const schedule = generateCronExpression(frequency, sendTime);
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
        return res.status(500).json(new ApiError(401, isScheduledTimeLargerThanCurrentTime,"Failed to schedule mail, Invalid time"));
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

    return res
            .status(201)
            .json(new ApiResponse(201,'Mail scheduled successfully', {jobId: job.id} ));

  } catch (error) {
    console.error('Error scheduling mail:', error);
    return res.status(500).json(new ApiError(500, error.message ));
  }

});


export const cancelMail = asyncHandler(async(req, res) => {
  try {
    const { jobId } = req.body;

    const job = await mailQueue.getJob(jobId);

    if (job) {
      await job.remove();
      await MailSchedule.findOneAndDelete({ jobId });
      await redisClient.hDel('jobs', job.id);
      return res.status(200).json({ message: 'Mail schedule canceled successfully' });
    } else {
      return res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const listScheduledMails = asyncHandler(async(req, res) => {
  try {
    const { senderEmail } = req.query;

    const jobs = await redisClient.hGetAll('jobs');

    const filteredJobs = Object.values(jobs || {}).filter(job => JSON.parse(job).senderEmail === senderEmail);
    return res.status(200).json(filteredJobs.map(job => JSON.parse(job)));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const uploadFile = upload.single('file');

export default{
  scheduleMail,
  cancelMail,
  listScheduledMails,
  uploadFile
}



