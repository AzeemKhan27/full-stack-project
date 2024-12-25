import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String },
  syllabus: { type: Array },
  price: { type: Number, required: true },
  duration: { type: String },
  timing: { type: String },
  faq: { type: Array },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;