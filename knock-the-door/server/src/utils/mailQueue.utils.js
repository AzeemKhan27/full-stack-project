

import Queue  from 'bull';
import nodemailer from 'nodemailer';
import redisClient from '../config/redisClient.js';

const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASS = process.env.MAIL_PASS;
const MAIL_HOST = process.env.MAIL_HOST || 'smtp.gmail.com';
const MAIL_PORT = process.env.MAIL_PORT || 587;

console.log("User : ",EMAIL_USER)
console.log("EMAIL_USER",EMAIL_USER);
console.log("MAIL_HOST",MAIL_HOST);
console.log("MAIL_PORT",MAIL_PORT);

const mailQueue = new Queue('mailQueue', {
  redis: {
    host: process.env.REDIS_CLOUD_URI_HOST,
    port: process.env.REDIS_CLOUD_URI_HOST_PORT,
    password: process.env.REDIS_CLOUD_PASSWORD,
  },
});

mailQueue.process(async (job) => {
  const { senderEmail, receiverEmails, subject, text, filePath } = job.data;

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false, // Use true for port 465
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `${senderEmail} <${EMAIL_USER}>`,
    to: receiverEmails,
    subject: subject,
    text: text,
    attachments: filePath ? [{ path: filePath }] : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

// Test sending an email immediately
(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: false, // Use true for port 465
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"azeemdeveloper27@gmail.com" <${EMAIL_USER}>`,
      to: "erazeem.career27@gmail.com",
      subject: "Test Email",
      text: "This is a test email.",
    });
    console.log("Test Email sent:", info.response);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
})();

export default mailQueue;

