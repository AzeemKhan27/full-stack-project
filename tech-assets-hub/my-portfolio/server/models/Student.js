import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  phoneNo: { type: String, required: true },
  city: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Array of course IDs
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;