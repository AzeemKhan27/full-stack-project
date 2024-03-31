
import contactService from '../services/contactService.js';

// Controller methods
const contactController = {
  async createContact(req, res) {
    try {
      const { name, email, message } = req.body;
      const newContact = await contactService.createContact({ name, email, message });
      res.status(201).json(newContact);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ message: 'Failed to create contact' });
    }
  },
};

export default contactController;
