import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  feedback: { type: String, required: true },
  designation: { type: String, required: true },
  avatar: { type: String, required: true },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
