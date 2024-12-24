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

export const sendClientNotification = async (req, res) => {
  const { clientName, phoneNumber, email, message, serviceType } = req.body;

  if (!clientName || !email || !phoneNumber || !serviceType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Client email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Notification for ${serviceType}`,
      html: `
        <h2>Dear ${clientName},</h2>
        <p>Thank you for reaching out to us for ${serviceType}.</p>
        <p>We will get back to you shortly!</p>
        <p>Best regards,<br>Team Tech Assets Hub.</p>
      `,
    };

    // Admin email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Service Request: ${serviceType}`,
      html: `
        <h2>Hi Consultant Team,</h2>
        <p><strong>${clientName}</strong> has reached out for <strong>${serviceType}</strong>. Here's the shared information:</p>
        <ul>
          <li><strong>Phone Number:</strong> ${phoneNumber}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Best regards,<br>Team Tech Assets Hub.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ message: 'Notifications sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send emails.', error });
  }
};

export const sendStudentNotifications = async (req, res) => {
  const { name, age, phone, email, message, serviceType } = req.body;

  if (!name || !age || !phone || !email || !serviceType) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Admin notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Service Request: ${serviceType}`,
      text: `Name: ${name}, Age: ${age}, Phone: ${phone}, Email: ${email}, Message: ${message}`,
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
