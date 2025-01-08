
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import Course from '../models/Course.js';

// export const createCourse = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       syllabus,
//       instructor,
//       instructor_2 = '', // Default to an empty string
//       duration,
//       timing,
//       price,
//       faq,
//     } = req.body;

//     let instructor_image_url = '';
//     let instructor_image_2_url = '';
//     let course_banner_image_url = '';

//     // Handle potential errors during image uploads
//     const uploadErrors = [];
//     if (req.files) {
//       // Upload instructor_image
//       if (req.files.instructor_image) {
//         for (const file of req.files.instructor_image) {
//           try {
//             const result = await cloudinary.uploader.upload(file.path, {
//               folder: 'courses',
//             });
//             instructor_image_url = result.secure_url;
//             break; // Only use the first uploaded image for instructor_image
//           } catch (error) {
//             console.error('Error uploading instructor image:', error);
//             uploadErrors.push('Error uploading instructor image');
//           }
//         }
//       }

//       // Upload instructor_image_2
//       if (req.files.instructor_image_2) {
//         for (const file of req.files.instructor_image_2) {
//           try {
//             const result = await cloudinary.uploader.upload(file.path, {
//               folder: 'courses',
//             });
//             instructor_image_2_url = result.secure_url;
//             break; // Only use the first uploaded image for instructor_image_2
//           } catch (error) {
//             console.error('Error uploading instructor image 2:', error);
//             uploadErrors.push('Error uploading instructor image 2');
//           }
//         }
//       }

//       // Upload course_banner_image
//       if (req.files.course_banner_image) {
//         for (const file of req.files.course_banner_image) {
//           try {
//             const result = await cloudinary.uploader.upload(file.path, {
//               folder: 'courses',
//             });
//             course_banner_image_url = result.secure_url;
//             break; // Only use the first uploaded image for course_banner_image
//           } catch (error) {
//             console.error('Error uploading course banner image:', error);
//             uploadErrors.push('Error uploading course banner image');
//           }
//         }
//       }
//     }

//     // Check for upload errors and return appropriate response
//     if (uploadErrors.length > 0) {
//       return res.status(500).json({ success: false, message: uploadErrors.join(', ') });
//     }

//     const course = await Course.create({
//       title,
//       description,
//       syllabus: JSON.parse(syllabus), // Parse syllabus if it's a string
//       instructor,
//       instructor_2: instructor_2 || '', // Ensure it's an empty string if undefined or null
//       duration,
//       timing,
//       price,
//       faq: JSON.parse(faq), // Parse faq if it's a string
//       instructor_image: instructor_image_url,
//       instructor_image_2: instructor_image_2_url || '', // Ensure it's an empty string if undefined or null
//       course_banner_image: course_banner_image_url,
//     });

//     res.status(201).json({ success: true, data: course });
//   } catch (error) {
//     console.error('Error creating course:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


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
    const courseId = req.body.courseId; 

    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    const { 
      title, 
      description, 
      syllabus, 
      instructor, 
      instructor_2 = '', 
      duration, 
      timing, 
      price, 
      faq, 
    } = req.body;

    let instructor_image_url = '';
    let instructor_image_2_url = '';
    let course_banner_image_url = '';

    if (req.files) {
      if (req.files.instructor_image && req.files.instructor_image[0]) {
        const result = await cloudinary.uploader.upload(req.files.instructor_image[0].path);
        instructor_image_url = result.secure_url;
      }

      if (req.files.instructor_image_2 && req.files.instructor_image_2[0]) {
        const result = await cloudinary.uploader.upload(req.files.instructor_image_2[0].path);
        instructor_image_2_url = result.secure_url;
      }

      if (req.files.course_banner_image && req.files.course_banner_image[0]) {
        const result = await cloudinary.uploader.upload(req.files.course_banner_image[0].path);
        course_banner_image_url = result.secure_url;
      }
    }

    // Check if any fields are actually being updated
    const updateData = {}; 
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (syllabus !== undefined) { 
      try { 
        updateData.syllabus = JSON.parse(syllabus); 
      } catch (error) { 
        console.error('Error parsing syllabus:', error); 
      } 
    }
    if (instructor !== undefined) updateData.instructor = instructor;
    if (instructor_2 !== undefined) updateData.instructor_2 = instructor_2;
    if (duration !== undefined) updateData.duration = duration;
    if (timing !== undefined) updateData.timing = timing;
    if (price !== undefined) updateData.price = price;
    if (faq !== undefined) { 
      try { 
        updateData.faq = JSON.parse(faq); 
      } catch (error) { 
        console.error('Error parsing faq:', error); 
      } 
    }
    if (instructor_image_url) updateData.instructor_image = instructor_image_url;
    if (instructor_image_2_url) updateData.instructor_image_2 = instructor_image_2_url;
    if (course_banner_image_url) updateData.course_banner_image = course_banner_image_url;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId, 
      updateData, 
      { new: true }
    ); 

    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Reorder updatedCourse object properties
    const reorderedCourse = {
      ...updatedCourse._doc, // Extract properties from the Mongoose document
      _id: updatedCourse._id,
      createdAt: updatedCourse.createdAt,
      __v: updatedCourse.__v,
    };

    res.status(200).json({ success: true, data: reorderedCourse });
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
