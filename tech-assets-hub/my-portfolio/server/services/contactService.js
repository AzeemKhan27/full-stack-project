// server/services/contactService.js

import Contact from '../models/Contact.js';

// Service methods
const contactService = {
  async createContact({ name, phoneNumber, email, message }) {
    const newContact = new Contact({ name, phoneNumber, email, message });
    return newContact.save();
  },

  async findRecentContact({ email, phoneNumber, name }) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return await Contact.findOne({
      $or: [{ email }, { phoneNumber }, { name }],
      createdAt: { $gte: twentyFourHoursAgo },
    });
  },
};

export default contactService;
