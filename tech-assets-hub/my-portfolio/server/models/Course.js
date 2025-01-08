//server/models/Course.js

import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseId: { type: String, unique: true }, // ✅ Unique course ID
  title: { type: String, required: true }, // ✅ Required
  description: { type: String }, // ✅ Optional
  syllabus: { type: Array, required: true }, // ✅ Required
  price: { type: Number, required: true }, // ✅ Required
  duration: { type: String }, // ✅ Optional
  timing: { type: String }, // ✅ Optional
  faq: { type: Array, required: true }, // ✅ Required
  instructors: [
    {
      name: { type: String, required: true }, // ✅ Required
      image: { type: String, default: "" }, // ✅ Optional
    },
  ],
  course_banner_image: { type: String, default: null }, // ✅ Optional
  createdAt: { type: Date, default: Date.now }, // ✅ Auto-generated
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
