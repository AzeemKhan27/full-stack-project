
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String },
  syllabus: { type: Array, required: true }, 
  price: { type: Number, required: true },
  duration: { type: String },
  timing: { type: String },
  faq: { type: Array, required: true }, 
  instructor_image: { type: String },
  course_banner_image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;