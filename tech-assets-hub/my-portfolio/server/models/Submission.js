import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  email: { type: String, required: true }, // No unique constraint
  phone: { type: String, required: true }, // No unique constraint
  serviceType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;
