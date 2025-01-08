//server/controllers/notifyController.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Submission from '../models/Submission.js'; // Import the Submission model
dotenv.config();

// Reusable transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

///////////////////// Client Notification /////////////////////////

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


///////////////////// Student Notification /////////////////////////

export const sendStudentNotifications = async (req, res) => {
  const { name, age, phone, email, message, serviceType } = req.body;

  if (!name || !age || !phone || !email || !message || !serviceType) {
    return res.status(400).json({ statusCode: 400,message: 'All fields are required.' });
  }

  try {
    const currentTime = new Date();

    // Check if the user has already submitted a request for the same serviceType
    const existingSubmissionSameService = await Submission.findOne({
      phone: phone,
      email: email,
      serviceType: serviceType,
    });

    if (existingSubmissionSameService) {
      // Calculate the time difference in hours
      const timeDifference = (currentTime - existingSubmissionSameService.timestamp) / (1000 * 60 * 60);

      // If the submission was made within the last 24 hours, return the response
      if (timeDifference < 24) {
        return res.status(409).json({
          statusCode: 409,
          message: "You have already filled your details, please allow us sometime to revert. In case you did not get a revert from our side, you can fill the same details after 24 hours.",
        });
      } else {
        // If more than 24 hours have passed, update the timestamp and allow the submission
        existingSubmissionSameService.timestamp = currentTime;
        await existingSubmissionSameService.save();
      }
    }

    // Save the new submission
    await Submission.create({ name, age, phone, email, message, serviceType, timestamp: currentTime });

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Service Request: ${serviceType}`,
      text: `Name: ${name}, Age: ${age}, Phone: ${phone}, Email: ${email}, Message: ${message}, ServiceType: ${serviceType}`,
    });

    // Send notification to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Request',
      text: `Hi ${name},\n\nWe are glad to see you on our portal. We will get in touch, schedule a meeting, and discuss your request soon.\n\nBest regards,\nStudent Services`,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Notifications sent successfully.',
      success: true,
      data: {
        submissionMessage: 'Your details have been submitted successfully!'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ statusCode: 500, message: 'Failed to process your request.', error });
  }
};

///////////////////// Send Joiner Notifications /////////////////////

import Joiner from '../models/TeamJoiner.js';

export const sendJoinerNotification = async (req, res) => {
  const {
    name,
    country,
    state,
    fullAddress,
    phoneNo,
    emailId,
    qualification,
    skills,
    experience,
  } = req.body;

  if (!name || !country || !state || !phoneNo || !emailId || !qualification || !skills) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the joiner is already registered
    const existingJoiner = await Joiner.findOne({ emailId });
    if (existingJoiner) {
      return res
        .status(409)
        .json({ message: 'You have already requested to join our team.' });
    }

    // Save joiner details to the database
    const newJoiner = await Joiner.create({
      name,
      country,
      state,
      fullAddress,
      phoneNo,
      emailId,
      qualification,
      skills,
      experience,
    });

    // Notify Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Joiner Application`,
      html: `
        <h2>New Joiner Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Address:</strong> ${fullAddress}</p>
        <p><strong>Phone:</strong> ${phoneNo}</p>
        <p><strong>Email:</strong> ${emailId}</p>
        <p><strong>Qualification:</strong> ${qualification}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Experience:</strong> ${experience}</p>
      `,
    });

    // Notify Joiner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: `Application Received`,
      html: `
        <h2>Hi ${name},</h2>
        <p>We got your details. Let us go through your details and skills. We will contact you soon if you are eligible to join our team.</p>
        <p>Best regards,<br>Team Tech Assets Hub.</p>
      `,
    });

    res.status(200).json({ message: 'Notifications sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send emails.', error });
  }
};


