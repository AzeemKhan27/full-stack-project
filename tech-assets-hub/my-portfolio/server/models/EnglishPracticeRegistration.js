// server/models/EnglishPracticeRegistration.js
import mongoose from 'mongoose';

const englishPracticeRegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  instructorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Instructor', 
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  paidAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('EnglishPracticeRegistration', englishPracticeRegistrationSchema);