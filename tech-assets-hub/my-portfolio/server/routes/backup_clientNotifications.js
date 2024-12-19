const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST route for handling client form submissions
router.post('/api/notify-client', async (req, res) => {
  const { clientName, phoneNumber, email, message, serviceType } = req.body;

  const emailContent = `
    <h2>New Client Inquiry</h2>
    <p><b>Service Type:</b> ${serviceType}</p>
    <p><b>Client Name:</b> ${clientName}</p>
    <p><b>Phone Number:</b> ${phoneNumber}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b> ${message}</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.ADMIN_EMAIL, // Replace with your admin email
        pass: process.env.ADMIN_PASSWORD, // Replace with your admin email password
      },
    });

    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: [process.env.ADMIN_EMAIL, email],
      subject: `New Client Inquiry for ${serviceType}`,
      html: emailContent,
    });

    res.status(200).json({ message: 'Notification email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

module.exports = router;
