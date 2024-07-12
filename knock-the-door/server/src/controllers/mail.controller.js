import MailSchedule  from '../models/mailSchedule.model.js';
import multer from 'multer';

import redisClient from '../config/redisClient.js';
import mailQueue from '../utils/mailQueue.utils.js';

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import moment from 'moment';

import  jwt  from "jsonwebtoken"

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '.');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

let isScheduledTimeLargerThanCurrentTime;
const generateCronExpression = (frequency, sendTime) => {

  const [hour, minute] = sendTime.split(':').map(Number);

  const scheduleDate = new Date();
  scheduleDate.setHours(hour, minute, 0, 0); // Set hours, minutes, seconds, and milliseconds

  isScheduledTimeLargerThanCurrentTime = scheduleDate.getTime() > Date.now();  // checking scheduleTime to current time;

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

  return cronExpression;
};

export const scheduleMail = asyncHandler(async(req, res) => {
    let { senderEmail, receiverEmails, subject, text, frequency, sendTime, endDate } = req.body;

  try {
    const filePath = req.file ? req.file.path : null;
    const schedule = generateCronExpression(frequency, sendTime);

    const job = await mailQueue.add(
      {
        senderEmail,
        receiverEmails,
        subject,
        text,
        filePath,
      },
      {
        repeat: { cron: schedule, endDate: new Date(endDate) },
      }
    );

    if(isScheduledTimeLargerThanCurrentTime == false){
        return res.status(500).json(new ApiResponse(500, 'Failed to schedule mail, Invalid time'));
    }
 
    const mailSchedule = await MailSchedule.create({
      senderEmail,
      receiverEmails,
      subject,
      text,
      filePath,
      schedule,
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
      res.status(200).json({ message: 'Mail schedule canceled successfully' });
    } else {
      res.status(404).json({ message: 'Job not found' });
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
    res.status(200).json(filteredJobs.map(job => JSON.parse(job)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const uploadFile = upload.single('file');

export default{
  scheduleMail,
  cancelMail,
  listScheduledMails,
  uploadFile
}



