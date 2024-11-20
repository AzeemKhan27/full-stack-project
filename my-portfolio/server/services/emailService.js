import nodemailer from 'nodemailer';
import nodemailerConfig from '../config/nodemailerConfig.js';

export const sendEmail = async (contact) => {
  try {
    const transporter = nodemailer.createTransport({
      service: nodemailerConfig.service,
      auth: {
        user: nodemailerConfig.auth.user,
        pass: nodemailerConfig.auth.pass,
      },
    });

    const mailOptions = {
      from: nodemailerConfig.auth.user,
      to: contact.email,
      subject: 'Thank you for contacting us!',
      text: `Hi ${contact.name},\n\nThank you for reaching out. We have received your message: "${contact.message}".\n\nWe will get back to you soon.\n\nBest regards,\nTeam Pick Assets`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
