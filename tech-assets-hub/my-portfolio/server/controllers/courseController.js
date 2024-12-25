
import cloudinary from '../config/cloudinary.js';
console.log(cloudinary);
import fs from 'fs';

import Course from '../models/Course.js';
console.log(Course); 

export const createCourse = async (req, res) => {
  try {
    const { title, description, syllabus, instructor, duration, timing, price, faq } = req.body;

    // Handle Image Upload
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'courses',
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const course = await Course.create({
      title,
      description,
      syllabus : JSON.parse(syllabus),
      instructor,
      duration,
      timing,
      price,
      faq : JSON.parse(faq),
      image: imageUrl,
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
