// server/controllers/contactController.js
import { sendEmail } from '../services/emailService.js';
import contactService from '../services/contactService.js';
import validator from 'validator';

// Controller methods
const contactController = {
  async createContact(req, res) {
    try {
      const { name, phoneNumber, email, message } = req.body;

      // Input validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address.' });
      }

      // Check if the user has already submitted a request within the last 24 hours
      const existingContact = await contactService.findRecentContact({ email, phoneNumber, name });

      if (existingContact) {
        return res.status(400).json({ message: 'You have already submitted a request. Our team will contact you shortly. If you haven\'t received a response within 1-2 days, you can submit again after 24 hours.' });
      }

      // Create a new contact
      const newContact = await contactService.createContact({ name, phoneNumber, email, message });

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
