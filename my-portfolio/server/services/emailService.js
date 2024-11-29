import nodemailer from 'nodemailer';
import nodemailerConfig from '../config/nodemailerConfig.js';

export const sendEmail = async (contact) => {
  try {
    if (!contact.email) {
      throw new Error('Recipient email is not defined.');
    }

    const transporter = nodemailer.createTransport({
      service: nodemailerConfig.service,
      auth: {
        user: nodemailerConfig.auth.user,
        pass: nodemailerConfig.auth.pass,
      },
    });

    // Email to the user
    const userMailOptions = {
      from: nodemailerConfig.auth.user,
      to: contact.email,
      subject: 'Thank you for contacting us!',
      text: `Hi ${contact.name},\n\nThank you for reaching out. We have received your message: "${contact.message}".\n\nWe will get back to you soon.\n\nBest regards,\nTeam Tech Assets Hub`,
    };

    // Notification email to admin/portal
    const adminMailOptions = {
      from: nodemailerConfig.auth.user,
      to: nodemailerConfig.adminEmail, // Admin/portal email
      subject: `New Contact Submission from ${contact.name}`,
      text: `Hi Admin, A new user has reached out to you via the contact form.\n\nDetails:\nName: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}\n\nPlease respond promptly.`,
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    return false;
  }
};
