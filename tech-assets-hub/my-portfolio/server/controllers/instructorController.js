// server/controllers/instructorController.js

import cloudinary from '../config/cloudinary.js';
import Instructor from '../models/Instructor.js';

import { createInstructor as createInstructorService } from '../models/Instructor.js';

export const createInstructor = async (req, res) => {
  try {
    const { name, email, phone, bio, pricePerHalfAnHour, callDuration, availability, specialization } = req.body;

    console.log("Request : ", req.body);
    console.log("FILE : ", req.file);

    if (!name || !email || !phone || !bio || !pricePerHalfAnHour || !callDuration) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const instructorData = { 
      name, 
      email, 
      phone, 
      bio, 
      pricePerHalfAnHour, 
      callDuration, 
      availability: availability || [], 
      specialization: specialization || 'General English' 
    };

    let imageUrl = '';

    if (req.file) {
      console.log('Uploading instructor image...');
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: 'instructors', timestamp: Math.floor(Date.now() / 1000) },
              (error, result) => {
                if (error) {
                  console.error(`Error uploading instructor image (attempt ${retryCount + 1}):`, error);
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );
            uploadStream.end(req.file.buffer);
          });

          imageUrl = result.secure_url;
          console.log('Image uploaded successfully. URL:', imageUrl);
          break; // Exit the retry loop on successful upload
        } catch (error) {
          retryCount++;
          if (retryCount >= maxRetries) {
            console.error('Max retries exceeded. Error uploading instructor image:', error);
            return res.status(500).json({ success: false, message: 'Error uploading instructor image' });
          }
          console.log(`Retrying image upload (attempt ${retryCount + 1})...`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay before retry
        }
      }
    }

    instructorData.image = imageUrl; // Assign the image URL

    // Use the correct createInstructor function
    const createdInstructor = await createInstructorService(instructorData);

    res.status(201).json({ success: true, data: createdInstructor });
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an instructor
export const updateInstructor = async (req, res) => {
  try {
    const { name, email, phone, bio, pricePerHalfAnHour, callDuration, availability, specialization } = req.body;
    let image = req.body.image || '';

    console.log('Received update request:', { name, email, phone, bio, pricePerHalfAnHour, callDuration, availability, specialization, image });

    if (req.file) {
      console.log('Uploading new image...');
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'instructors', timestamp: Math.floor(Date.now() / 1000) },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(req.file.buffer);
      });

      image = result.secure_url;
      console.log('New image URL:', image);
    }

    console.log('Updating instructor with ID:', req.query.id);

    const updatedInstructor = await Instructor.findByIdAndUpdate(
      { _id: req.body.id },
      { name, email, phone, bio, pricePerHalfAnHour, callDuration, availability, specialization, image },
      { new: true }
    );

    if (!updatedInstructor) {
      console.error('Instructor not found:', req.query.id);
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }

    console.log('Updated instructor:', updatedInstructor);

    res.status(200).json({ success: true, data: updatedInstructor });
  } catch (error) {
    console.error('Error updating instructor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an instructor
export const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.body.id);
    if (!instructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }
    res.status(200).json({ success: true, message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single instructor by ID
export const getInstructorById = async (req, res) => {
  try {
    // const instructor = await Instructor.findById(req.query.id);
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ success: false, message: 'Instructor not found' });
    }
    res.status(200).json({ success: true, data: instructor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all instructors
export const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    console.log("instructors : ", instructors);
    res.status(200).json({ success: true, data: instructors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ::::::::::::::::::::::::::::::::::::::::::::::::::::

// import cloudinary from '../config/cloudinary.js';
// import Instructor from '../models/Instructor.js';

// import { createInstructor as createInstructorService } from '../models/Instructor.js';

// export const createInstructor = async (req, res) => {
//   try {
//     const { name, email, phone, bio } = req.body;

//     console.log("Request : ", req.body)
//     console.log("FILE : ", req.file)

//     if (!name || !email || !phone || !bio) {
//       return res.status(400).json({ success: false, message: 'All fields are required.' });
//     }

//     const instructorData = { name, email, phone, bio };

//     let imageUrl = '';

//     if (req.file) {
//       console.log('Uploading instructor image...');
//       let retryCount = 0;
//       const maxRetries = 3;

//       while (retryCount < maxRetries) {
//         try {
//           const result = await new Promise((resolve, reject) => {
//             const uploadStream = cloudinary.uploader.upload_stream(
//               { folder: 'instructors', timestamp: Math.floor(Date.now() / 1000) },
//               (error, result) => {
//                 if (error) {
//                   console.error(`Error uploading instructor image (attempt ${retryCount + 1}):`, error);
//                   reject(error);
//                 } else {
//                   resolve(result);
//                 }
//               }
//             );
//             uploadStream.end(req.file.buffer);
//           });

//           imageUrl = result.secure_url;
//           console.log('Image uploaded successfully. URL:', imageUrl);
//           break; // Exit the retry loop on successful upload
//         } catch (error) {
//           retryCount++;
//           if (retryCount >= maxRetries) {
//             console.error('Max retries exceeded. Error uploading instructor image:', error);
//             return res.status(500).json({ success: false, message: 'Error uploading instructor image' });
//           }
//           console.log(`Retrying image upload (attempt ${retryCount + 1})...`);
//           await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay before retry
//         }
//       }
//     }

//     instructorData.image = imageUrl; // Assign the image URL

//     // Use the correct createInstructor function
//     const createdInstructor = await createInstructorService(instructorData);

//     res.status(201).json({ success: true, data: createdInstructor });
//   } catch (error) {
//     console.error('Error creating instructor:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // Update an instructor
// export const updateInstructor = async (req, res) => {
//   try {
//     const { name, email, phone, bio } = req.body;
//     let image = req.body.image || '';

//     console.log('Received update request:', { name, email, phone, bio, image });

//     if (req.file) {
//       console.log('Uploading new image...');
//       const result = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: 'instructors', timestamp: Math.floor(Date.now() / 1000) },
//           (error, result) => {
//             if (error) {
//               console.error('Cloudinary upload error:', error);
//               reject(error);
//             } else {
//               resolve(result);
//             }
//           }
//         );
//         uploadStream.end(req.file.buffer);
//       });

//       image = result.secure_url;
//       console.log('New image URL:', image);
//     }

//     console.log('Updating instructor with ID:', req.query.id);

//     const updatedInstructor = await Instructor.findByIdAndUpdate(
//       {_id:req.body.id},
//       { name, email, phone, bio, image },
//       { new: true }
//     );

//     if (!updatedInstructor) {
//       console.error('Instructor not found:', req.query.id);
//       return res.status(404).json({ success: false, message: 'Instructor not found' });
//     }

//     console.log('Updated instructor:', updatedInstructor);

//     res.status(200).json({ success: true, data: updatedInstructor });
//   } catch (error) {
//     console.error('Error updating instructor:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // Delete an instructor
// export const deleteInstructor = async (req, res) => {
//   try {
//     const instructor = await Instructor.findByIdAndDelete(req.body.id);
//     if (!instructor) {
//       return res.status(404).json({ success: false, message: 'Instructor not found' });
//     }
//     res.status(200).json({ success: true, message: 'Instructor deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get a single instructor by ID
// export const getInstructorById = async (req, res) => {
//   try {
//     const instructor = await Instructor.findById(req.query.id);
//     if (!instructor) {
//       return res.status(404).json({ success: false, message: 'Instructor not found' });
//     }
//     res.status(200).json({ success: true, data: instructor });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get all instructors
// export const getInstructors = async (req, res) => {
//   try {
//     const instructors = await Instructor.find();
//     console.log("instructors : ", instructors)
//     res.status(200).json({ success: true, data: instructors });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };