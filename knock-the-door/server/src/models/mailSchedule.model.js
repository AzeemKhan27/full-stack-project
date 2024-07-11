import mongoose from 'mongoose';

const mailScheduleSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  receiverEmails: { type: [String], required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  filePath: { type: String, required: true },
  schedule: { type: String, required: true },
  endDate: { type: Date, required: true },
  jobId: { type: String, required: true } // store Bull job ID
});

// module.exports = mongoose.model('MailSchedule', mailScheduleSchema);

const MailSchedule = mongoose.model("MailSchedule", mailScheduleSchema);

export default MailSchedule;