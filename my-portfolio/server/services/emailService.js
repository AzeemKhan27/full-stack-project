// services/emailService.js
import nodemailer from 'nodemailer';
import nodemailerConfig from '../config/nodemailerConfig.js';

export const sendEmail = async (contact) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  const mailOptions = {
    from: contact.email,
    to: nodemailerConfig.auth.user, // Your email
    subject: `Contact Form Submission from ${contact.name}`,
    text: contact.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true; // Email sent successfully
  } catch (error) {
    console.error('Error sending email:', error);
    return false; // Email sending failed
  }
};