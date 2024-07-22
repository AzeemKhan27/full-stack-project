import { ApiError } from './ApiError.js';

export const generateCronExpression = (frequency, sendTime) => {

  if (!sendTime) {
    return resizeBy.status(400).json(new ApiError(400,{},"Invalid send time and send time is required."));
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
    return res.status(400).json(new ApiError(`Invalid frequency`));
  }

  return { cronExpression, isScheduledTimeLargerThanCurrentTime };
};
