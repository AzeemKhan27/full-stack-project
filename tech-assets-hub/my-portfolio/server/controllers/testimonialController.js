import Testimonial from '../models/Testimonial.js';
import cloudinary from '../config/cloudinary.js';

// Create a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, feedback, designation } = req.body;
    const file = req.file;

    console.log("FILE : ", file);

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload image to Cloudinary
   // Upload image to Cloudinary
   const result = await cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
    if (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
    }

    const testimonial = new Testimonial({
      name,
      feedback,
      designation,
      avatar: result.secure_url,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
    }).end(file.buffer);
    
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single testimonial by ID
export const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a testimonial by ID
export const updateTestimonial = async (req, res) => {
  try {
    const { name, feedback, designation } = req.body;
    const file = req.file;

    let avatarUrl = null;
    if (file) {
      const result = await cloudinaryV2.uploader.upload(file.buffer, {
        folder: 'testimonials',
      });
      avatarUrl = result.secure_url;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, feedback, designation, avatar: avatarUrl || testimonial.avatar },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
