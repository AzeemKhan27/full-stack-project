import nodemailer from 'nodemailer';

export const sendClientNotification = async (req, res) => {
  const { clientName, phoneNumber, email, message, serviceType } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to client
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Client's email
      subject: `Notification for ${serviceType}`,
      html: `
        <h2>Dear ${clientName},</h2>
        <p>Thank you for reaching out to us for ${serviceType}.</p>
        <p>We will get back to you shortly!</p>
        <p>Best regards,<br>Team Tech Assets Hub.</p>
      `,
    };

    // Email to admin
    const informToAdmin = {
      from: process.env.EMAIL_USER, // Sender's email (admin email address)
      to: process.env.ADMIN_EMAIL, // Admin's email
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

    // Send emails to client and admin
    const clientEmailResponse = await transporter.sendMail(mailOptions);
    const adminEmailResponse = await transporter.sendMail(informToAdmin);

    // Respond with success if both emails are sent
    res.status(200).json({
      message: 'Notifications sent successfully!',
      clientEmailResponse,
      adminEmailResponse,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send emails.', error });
  }
};
