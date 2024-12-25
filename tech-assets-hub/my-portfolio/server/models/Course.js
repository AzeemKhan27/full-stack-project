const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  syllabus: { type: [String], required: true },
  instructor: {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    photo: { type: String }, // URL to Cloudinary image
  },
  duration: { type: String, required: true },
  timing: { type: String, required: true },
  price: { type: Number, required: true }, // New Field: Course Price
  faq: { type: [Object], default: [] }, // { question: String, answer: String }
  image: { type: String }, // URL to Cloudinary image
});

module.exports = mongoose.model('Course', courseSchema);
