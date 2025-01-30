
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import Course from '../models/Course.js';

import { nanoid } from 'nanoid';




export const createCourse = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body
    console.log('Request Files:', req.files); // Log the request files

    const {
      title,
      description,
      syllabus,
      duration,
      timing,
      price,
      faq,
      instructors, // Array of instructor objects (as a JSON string)
    } = req.body;

    // Parse JSON fields
    let parsedSyllabus, parsedFaq, parsedInstructors;
    try {
      parsedSyllabus = JSON.parse(syllabus);
      parsedFaq = JSON.parse(faq);
      parsedInstructors = JSON.parse(instructors); // Parse instructors
    } catch (error) {
      console.error('Error parsing JSON fields:', error);
      return res.status(400).json({ success: false, message: 'Invalid JSON in syllabus, faq, or instructors' });
    }

    // Generate a unique courseId
    const courseId = nanoid(10);

    let course_banner_image_url = '';

    // Handle potential errors during image uploads
    const uploadErrors = [];

    // Upload course banner image
    if (req.files?.course_banner_image) {
      console.log('Uploading course banner image...');
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

    // Upload instructor images and create instructor objects
    const instructorData = [];
    if (req.files?.instructor_images) {
      console.log('Uploading instructor images...');
      for (let i = 0; i < parsedInstructors.length; i++) {
        const instructor = parsedInstructors[i];
        if (req.files.instructor_images[i]) {
          try {
            const result = await cloudinary.uploader.upload(req.files.instructor_images[i].path, {
              folder: 'courses',
            });
            instructorData.push({
              name: instructor.name,
              image: result.secure_url, // Cloudinary URL
            });
          } catch (error) {
            console.error('Error uploading instructor image:', error);
            uploadErrors.push(`Error uploading image for instructor ${instructor.name}`);
          }
        } else {
          instructorData.push({
            name: instructor.name,
            image: '', // No image provided
          });
        }
      }
    }

    // Check for upload errors and return appropriate response
    if (uploadErrors.length > 0) {
      console.error('Upload errors:', uploadErrors);
      return res.status(500).json({ success: false, message: uploadErrors.join(', ') });
    }

    // Create the course
    const course = await Course.create({
      courseId, // Add the generated courseId
      title,
      description,
      syllabus: parsedSyllabus,
      duration,
      timing,
      price,
      faq: parsedFaq,
      instructors: instructorData, // Array of instructor objects
      course_banner_image: course_banner_image_url,
    });

    console.log('Course created successfully:', course);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ success: false, message: error.message }); // Return the actual error message
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
    // const courses = await Course.find({ title: { $regex: title, $options: 'i' } })
    //   .select('-__v') // Exclude version key
    //   .lean(); // Optimize performance by skipping Mongoose hydration

    const courses = await Course.find({ title: { $regex: title, $options: 'i' } });

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
    const { courseId } = req.body || req.params;

    // Check if courseId is provided (mandatory)
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    // Find the course by courseId
    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const {
      title,
      description,
      syllabus,
      duration,
      timing,
      price,
      faq,
      instructors, // Array of instructor objects (as a JSON string)
    } = req.body;

    // Parse JSON fields (if provided)
    let parsedSyllabus, parsedFaq, parsedInstructors;
    if (syllabus) {
      try {
        parsedSyllabus = JSON.parse(syllabus);
      } catch (error) {
        console.error('Error parsing syllabus:', error);
        return res.status(400).json({ success: false, message: 'Invalid JSON in syllabus' });
      }
    }
    if (faq) {
      try {
        parsedFaq = JSON.parse(faq);
      } catch (error) {
        console.error('Error parsing faq:', error);
        return res.status(400).json({ success: false, message: 'Invalid JSON in faq' });
      }
    }
    if (instructors) {
      try {
        parsedInstructors = JSON.parse(instructors);
      } catch (error) {
        console.error('Error parsing instructors:', error);
        return res.status(400).json({ success: false, message: 'Invalid JSON in instructors' });
      }
    }

    // Handle file uploads
    let course_banner_image_url = course.course_banner_image; // Keep existing if no new file is uploaded
    const uploadErrors = [];

    // Upload course banner image (if provided)
    if (req.files?.course_banner_image) {
      console.log('Uploading course banner image...');
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

    // Handle instructor updates (if provided)
    let updatedInstructors = course.instructors; // Keep existing instructors if no updates are provided
    if (parsedInstructors && req.files?.instructor_images) {
      console.log('Updating instructor images...');
      updatedInstructors = parsedInstructors.map((instructor, index) => {
        const existingInstructor = course.instructors[index] || {};
        return {
          name: instructor.name || existingInstructor.name,
          image: existingInstructor.image, // Keep existing image if no new file is uploaded
        };
      });

      // Upload new instructor images (if provided)
      for (let i = 0; i < updatedInstructors.length; i++) {
        if (req.files.instructor_images[i]) {
          try {
            const result = await cloudinary.uploader.upload(req.files.instructor_images[i].path, {
              folder: 'courses',
            });
            updatedInstructors[i].image = result.secure_url; // Update with new image URL
          } catch (error) {
            console.error('Error uploading instructor image:', error);
            uploadErrors.push(`Error uploading image for instructor ${updatedInstructors[i].name}`);
          }
        }
      }
    }

    // Check for upload errors and return appropriate response
    if (uploadErrors.length > 0) {
      console.error('Upload errors:', uploadErrors);
      return res.status(500).json({ success: false, message: uploadErrors.join(', ') });
    }

    // Prepare update data
    const updateData = {
      title: title || course.title,
      description: description || course.description,
      syllabus: parsedSyllabus || course.syllabus,
      duration: duration || course.duration,
      timing: timing || course.timing,
      price: price || course.price,
      faq: parsedFaq || course.faq,
      instructors: updatedInstructors,
      course_banner_image: course_banner_image_url,
    };

    // Update the course
    const updatedCourse = await Course.findOneAndUpdate(
      { courseId }, // Find by courseId
      updateData,
      { new: true } // Return the updated document
    );

    res.status(200).json({ success: true, message: 'Course updated successfully', data: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId, instructorId } = req.params;

    // Check if courseId is provided (mandatory)
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    // Find the course by courseId
    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Case 1: Delete a specific instructor from the course
    if (instructorId) {
      // Filter out the instructor to be deleted
      const updatedInstructors = course.instructors.filter(
        (instructor) => instructor._id.toString() !== instructorId
      );

      // If no instructor was found with the given instructorId
      if (updatedInstructors.length === course.instructors.length) {
        return res.status(404).json({ success: false, message: 'Instructor not found in the course' });
      }

      // Update the course with the remaining instructors
      course.instructors = updatedInstructors;
      await course.save();

      return res.status(200).json({ success: true, message: 'Instructor deleted successfully', data: course });
    }

    // Case 2: Delete the entire course
    await Course.findOneAndDelete({ courseId });

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course or instructor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
