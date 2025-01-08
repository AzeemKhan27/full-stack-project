import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }, // No unique constraint
  serviceType: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;