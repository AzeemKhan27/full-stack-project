
const generateCronExpression = (frequency, sendTime) => {

  const [hour, minute] = sendTime.split(':').map(Number);

  const scheduleDate = new Date();
  scheduleDate.setHours(hour, minute, 0, 0); // Set hours, minutes, seconds, and milliseconds

  const isScheduledTimeLargerThanCurrentTime = scheduleDate.getTime() > Date.now();  // checking scheduleTime to current time;

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

  return {cronExpression, isScheduledTimeLargerThanCurrentTime};
};

export default generateCronExpression;