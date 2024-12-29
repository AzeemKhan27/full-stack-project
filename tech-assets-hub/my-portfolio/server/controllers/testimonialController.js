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
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
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

        testimonial.save()
          .then(() => res.status(201).json(testimonial))
          .catch((err) => {
            console.error('Error saving testimonial:', err);
            res.status(500).json({ message: 'Error saving testimonial' });
          });
      }
    ).end(file.buffer);

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

// import Testimonial from '../models/Testimonial.js';
// import cloudinary from '../config/cloudinary.js';

// Update a testimonial by ID
export const updateTestimonial = async (req, res) => {
  try {
    const { name, feedback, designation } = req.body;
    const file = req.file;

    // Fetch the existing testimonial
    const testimonialId = req.body.id || req.params.id;
    console.log('Testimonial ID:', testimonialId); // Log the ID

    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    let avatarUrl = testimonial.avatar;
    if (file) {
      const base64String = file.buffer.toString('base64');
      const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64String}`, {
        folder: 'testimonials',
      });

      avatarUrl = result.secure_url;
    }

    // Update the testimonial fields
    testimonial.name = name;
    testimonial.feedback = feedback;
    testimonial.designation = designation;
    testimonial.avatar = avatarUrl;

    await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error); // Log the error
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
