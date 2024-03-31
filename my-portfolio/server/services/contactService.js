// server/services/contactService.js

import Contact from '../models/Contact.js';

// Service methods
const contactService = {
  async createContact({ name, email, message }) {
    const newContact = new Contact({ name, email, message });
    return newContact.save();
  },
};

export default contactService;
