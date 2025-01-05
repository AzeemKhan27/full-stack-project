// server/utils/sendEmail.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Reusable transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendStudentNotifications = async (req, res) => {
  const { name, email, phoneNo, serviceType } = req.body;

  if (!name || !email || !phoneNo || !serviceType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Admin notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Service Request: ${serviceType}`,
      text: `Name: ${name}, Email: ${email}, Phone: ${phoneNo}`,
    });

    // Student notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Request',
      text: `Hi ${name},\n\nWe are glad to see you on our portal. We will get in touch, schedule a meeting, and discuss your request soon.\n\nBest regards,\nStudent Services`,
    });

    res.status(200).json({ message: 'Notifications sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send emails.', error });
  }
};

export { transporter };