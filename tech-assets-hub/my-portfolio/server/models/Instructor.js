// server/models/Instructor.js
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const InstructorSchema = new mongoose.Schema({
  instructorId: { type: String, unique: true, default: () => nanoid(10) },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },

  upiId: { type: String },
  bankAccount: {
    accountNumber: { type: String },
    ifscCode: { type: String },
  },
  pendingPayments: [
    {
      amount: { type: Number },
      registrationId: { type: mongoose.Schema.Types.ObjectId, ref: 'EnglishPracticeRegistration' },
    },
  ],

  bio: { type: String, required: true },
  image: { type: String, default: '' },
  tagline: { type: String, default: 'English Speaking Partner' },
  pricePerHalfAnHour: { type: Number, required: true }, // Price per hour for sessions
  callDuration: { type: Number, required: true }, // Duration of each session in minutes
  availability: { 
    type: [String], // Array of available days/times (e.g., ["Mon 10:00 AM", "Wed 2:00 PM"])
    default: [],
  },
  rating: { 
    type: Number, 
    default: 0, // Default rating (can be updated based on reviews)
    min: 0,
    max: 5,
  },
  specialization: { 
    type: String, // Specialization (e.g., Business English, Casual Conversation)
    default: 'General English',
  },
  createdAt: { type: Date, default: Date.now },
});

const Instructor = mongoose.model('Instructor', InstructorSchema);
export default Instructor;

export const createInstructor = async (instructorData) => {
  try {
    const instructor = await Instructor.create(instructorData);
    return instructor;
  } catch (error) {
    throw error;
  }
};
