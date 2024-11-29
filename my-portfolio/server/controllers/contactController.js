import Contact from '../models/Contact.js';
import { sendEmail } from '../services/emailService.js';
import contactService from '../services/contactService.js';

// Controller methods
const contactController = {
  async createContact(req, res) {
    try {
      const { name, email, message } = req.body;
     
      // Input validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
      }

      const newContact = await contactService.createContact({ name, email, message });

      // Send email after creating the contact
      const emailSent = await sendEmail(newContact);

      if (emailSent) {
        return res.status(201).json({ message: 'Contact created and email sent successfully!', contact: newContact });
      } else {
        return res.status(500).json({ message: 'Contact created, but failed to send email.' });
      }
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ message: 'Failed to create contact' });
    }
  },
};

export default contactController;
