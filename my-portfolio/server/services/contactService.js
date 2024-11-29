// server/services/contactService.js

import Contact from '../models/Contact.js';

// Service methods
const contactService = {
  async createContact({ name, phoneNumber, email, message }) {
    const newContact = new Contact({ name, phoneNumber, email, message });
    return newContact.save();
  },
};

export default contactService;
