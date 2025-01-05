//server/models/Course.js

import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseId: {type: String, unique: true},
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  instructor_2: { type: String, default: "" }, // Optional field
  description: { type: String },
  syllabus: { type: Array, required: true },
  price: { type: Number, required: true },
  duration: { type: String },
  timing: { type: String },
  faq: { type: Array, required: true },
  instructor_image: { type: String, default: null }, // Optional image
  instructor_image_2: { type: String, default: "" }, // Optional second image
  course_banner_image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
