// server/models/Contact.js

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;


// models/contactModel.js
// class Contact {
//   constructor(name, email, message) {
//     this.name = name;
//     this.email = email;
//     this.message = message;
//   }
// }

// module.exports = Contact;
