
import cloudinary from '../config/cloudinary.js';

import fs from 'fs';

import Course from '../models/Course.js';

// export const createCourse = async (req, res) => {
//   try {
//     const { title, description, syllabus, instructor, duration, timing, price, faq } = req.body;

//     // Handle Image Upload
//     let instructor_image_url = '';
//     let course_banner_image_url = '';
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'courses',
//       });
//       instructor_image_url = result.secure_url;
//       course_banner_image_url = result.secure_url;
//       fs.unlinkSync(req.file.path);
//     }

//     const course = await Course.create({
//       title,
//       description,
//       syllabus : JSON.parse(syllabus),
//       instructor,
//       duration,
//       timing,
//       price,
//       faq : JSON.parse(faq),
//       instructor_image: instructor_image_url,
//       course_banner_image : course_banner_image_url
//     });

//     res.status(201).json({ success: true, data: course });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


export const createCourse = async (req, res) => {
  try {
    const { title, description, syllabus, instructor, duration, timing, price, faq } = req.body;

    let instructor_image_url = '';
    let course_banner_image_url = '';

    // Handle potential errors during image uploads
    const uploadErrors = [];
    if (req.files) {
      for (const file of req.files.instructor_image) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'courses',
          });
          instructor_image_url = result.secure_url;
          break; // Only use the first uploaded image for instructor_image
        } catch (error) {
          console.error('Error uploading instructor image:', error);
          uploadErrors.push('Error uploading instructor image');
        }
      }

      for (const file of req.files.course_banner_image) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'courses',
          });
          course_banner_image_url = result.secure_url;
          break; // Only use the first uploaded image for course_banner_image
        } catch (error) {
          console.error('Error uploading course banner image:', error);
          uploadErrors.push('Error uploading course banner image');
        }
      }
    }

    // Check for upload errors and return appropriate response
    if (uploadErrors.length > 0) {
      return res.status(500).json({ success: false, message: uploadErrors.join(', ') });
    }

    const course = await Course.create({
      title,
      description,
      syllabus: JSON.parse(syllabus), // Parse syllabus if it's a string
      instructor,
      duration,
      timing,
      price,
      faq: JSON.parse(faq), // Parse faq if it's a string
      instructor_image: instructor_image_url,
      course_banner_image: course_banner_image_url,
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Search courses by title
export const searchCoursesByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title query parameter is required." });
    }

    // Search for courses by title (case-insensitive)
    const courses = await Course.find({ title: { $regex: title, $options: 'i' } })
      .select('-__v') // Exclude version key
      .lean(); // Optimize performance by skipping Mongoose hydration

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error('Error searching courses by title:', error);
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
