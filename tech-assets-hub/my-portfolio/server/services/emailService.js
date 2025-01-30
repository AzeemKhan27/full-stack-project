// // server/services/emailService.js

// Latest New ///////////////////////////////

// server/services/emailService.js
import nodemailer from 'nodemailer';
import nodemailerConfig from '../config/nodemailerConfig.js';

const transporter = nodemailer.createTransport({
  service: nodemailerConfig.service,
  auth: {
    user: nodemailerConfig.auth.user,
    pass: nodemailerConfig.auth.pass,
  },
});

// const transporter = nodemailer.createTransport({
//   service: nodemailerConfig.service,
//   auth: nodemailerConfig.auth,
// });

export const sendPaymentDetailsUpdateEmail = async (instructor, amount) => {
  await sendEmail({
    to: instructor.email,
    subject: 'Update Payment Details',
    html: `
      <p>Hi ${instructor.name},</p>
      <p>We were unable to transfer your payment of ₹${amount} due to missing or invalid payment details.</p>
      <p>Please update your UPI ID or bank account details in our system.</p>
      <p>Best regards,<br/>Tech Assets Hub</p>
    `,
  });
};

// Generic email sender
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    if (!to) throw new Error('Recipient email required');

    const mailOptions = {
      from: `"Teach Assets Hub" <${nodemailerConfig.auth.user}>`,
      to,
      subject,
      html,
      text,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

// Contact Form Emails (Original Functionality)
export const sendContactEmails = async (contact) => {
  try {
    // User confirmation email
    await sendEmail({
      to: contact.email,
      subject: 'Thank you for contacting us!',
      text: `Hi ${contact.name},\n\nThank you for reaching out. We have received your message: "${contact.message}".\n\nWe will get back to you soon.\n\nBest regards,\nTeam Tech Assets Hub`
    });

    // Admin notification email
    await sendEmail({
      to: nodemailerConfig.adminEmail,
      subject: `New Contact Submission from ${contact.name}`,
      text: `Hi Admin,\n\nA new user has reached out via the contact form:\n\nName: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}\n\nPlease respond promptly.`
    });

    return true;
  } catch (error) {
    console.error('Error sending contact emails:', error);
    return false;
  }
};

// English Practice Emails (New Functionality)
export const sendPaymentSuccessEmails = async (registration, instructor) => {
  const studentHtml = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #1a365d;">Hi ${registration.fullName},</h2>
      <p>Your payment of ₹${instructor.pricePerHalfAnHour} for the English practice session with ${instructor.name} was successful!</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2d3748; margin-bottom: 10px;">Session Details:</h3>
        <p><strong>Instructor:</strong> ${instructor.name}</p>
        <p><strong>Contact Email:</strong> ${instructor.email}</p>
        <p><strong>Your Contact:</strong> ${registration.phone}</p>
      </div>
      <p>${instructor.name} will contact you within 24 hours to schedule your session.</p>
      <p style="color: #718096;">If you don't hear from the instructor within 24 hours, you'll receive an automatic refund.</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p>Best regards,<br/>The Teach Assets Hub Team</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: registration.email,
    subject: 'Payment Successful - English Practice Session',
    html: studentHtml
  });
};

export const sendInstructorNotification = async (registration, instructor) => {
  const instructorHtml = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #1a365d;">Hi ${instructor.name},</h2>
      <p>You have a new English practice session booking:</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2d3748; margin-bottom: 10px;">Student Details:</h3>
        <p><strong>Name:</strong> ${registration.fullName}</p>
        <p><strong>Email:</strong> ${registration.email}</p>
        <p><strong>Phone:</strong> ${registration.phone}</p>
        <p><strong>City:</strong> ${registration.city}</p>
        <p><strong>Session Fee:</strong> ₹${instructor.pricePerHalfAnHour}</p>
      </div>
      <p>Please contact the student within 24 hours to schedule the session.</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p>Best regards,<br/>The Teach Assets Hub Team</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: instructor.email,
    subject: 'New English Practice Booking',
    html: instructorHtml
  });
};

export const sendPaymentReminder = async (registration) => {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #1a365d;">Hi ${registration.fullName},</h2>
      <p>Your English practice session registration is almost complete!</p>
      <div style="text-align: center; margin: 25px 0;">
        <a href="${process.env.FRONTEND_URL}/payment/${registration._id}"
           style="background-color: #4299e1; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          Complete Payment Now
        </a>
      </div>
      <p style="color: #718096;">This link will expire in 24 hours.</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <p>Best regards,<br/>The Teach Assets Hub Team</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: registration.email,
    subject: 'Complete Your English Practice Registration',
    html
  });
};

// Maintain backward compatibility for existing contact form
export default sendContactEmails;


////////////////////////NEW ////////////////////////////////
// // server/services/emailService.js
// import nodemailer from 'nodemailer';
// import nodemailerConfig from '../config/nodemailerConfig.js';

// const transporter = nodemailer.createTransport({
//   service: nodemailerConfig.service,
//   auth: {
//     user: nodemailerConfig.auth.user,
//     pass: nodemailerConfig.auth.pass,
//   },
// });

// // Generic email sender
// const sendEmail = async ({ to, subject, html, text }) => {
//   try {
//     if (!to) throw new Error('Recipient email required');
    
//     const mailOptions = {
//       from: `"Teach Assets Hub" <${nodemailerConfig.auth.user}>`,
//       to,
//       subject,
//       html,
//       text,
//     };

//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     console.error('Email send error:', error);
//     return false;
//   }
// };

// // Contact Form Emails (Original Functionality)
// export const sendContactEmails = async (contact) => {
//   try {
//     // User confirmation email
//     await sendEmail({
//       to: contact.email,
//       subject: 'Thank you for contacting us!',
//       text: `Hi ${contact.name},\n\nThank you for reaching out. We have received your message: "${contact.message}".\n\nWe will get back to you soon.\n\nBest regards,\nTeam Tech Assets Hub`
//     });

//     // Admin notification email
//     await sendEmail({
//       to: nodemailerConfig.adminEmail,
//       subject: `New Contact Submission from ${contact.name}`,
//       text: `Hi Admin,\n\nA new user has reached out via the contact form:\n\nName: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}\n\nPlease respond promptly.`
//     });

//     return true;
//   } catch (error) {
//     console.error('Error sending contact emails:', error);
//     return false;
//   }
// };

// // English Practice Emails (New Functionality)
// export const sendPaymentSuccessEmails = async (registration, instructor) => {
//   const studentHtml = `
//     <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//       <h2 style="color: #1a365d;">Hi ${registration.fullName},</h2>
//       <p>Your payment of ₹${instructor.pricePerHalfAnHour} for the English practice session with ${instructor.name} was successful!</p>
//       <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
//         <h3 style="color: #2d3748; margin-bottom: 10px;">Session Details:</h3>
//         <p><strong>Instructor:</strong> ${instructor.name}</p>
//         <p><strong>Contact Email:</strong> ${instructor.email}</p>
//         <p><strong>Your Contact:</strong> ${registration.phone}</p>
//       </div>
//       <p>${instructor.name} will contact you within 24 hours to schedule your session.</p>
//       <p style="color: #718096;">If you don't hear from the instructor within 24 hours, you'll receive an automatic refund.</p>
//       <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
//         <p>Best regards,<br/>The Teach Assets Hub Team</p>
//       </div>
//     </div>
//   `;

//   await sendEmail({
//     to: registration.email,
//     subject: 'Payment Successful - English Practice Session',
//     html: studentHtml
//   });
// };

// export const sendInstructorNotification = async (registration, instructor) => {
//   const instructorHtml = `
//     <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//       <h2 style="color: #1a365d;">Hi ${instructor.name},</h2>
//       <p>You have a new English practice session booking:</p>
//       <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
//         <h3 style="color: #2d3748; margin-bottom: 10px;">Student Details:</h3>
//         <p><strong>Name:</strong> ${registration.fullName}</p>
//         <p><strong>Email:</strong> ${registration.email}</p>
//         <p><strong>Phone:</strong> ${registration.phone}</p>
//         <p><strong>City:</strong> ${registration.city}</p>
//         <p><strong>Session Fee:</strong> ₹${instructor.pricePerHalfAnHour}</p>
//       </div>
//       <p>Please contact the student within 24 hours to schedule the session.</p>
//       <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
//         <p>Best regards,<br/>The Teach Assets Hub Team</p>
//       </div>
//     </div>
//   `;

//   await sendEmail({
//     to: instructor.email,
//     subject: 'New English Practice Booking',
//     html: instructorHtml
//   });
// };

// export const sendPaymentReminder = async (registration) => {
//   const html = `
//     <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
//       <h2 style="color: #1a365d;">Hi ${registration.fullName},</h2>
//       <p>Your English practice session registration is almost complete!</p>
//       <div style="text-align: center; margin: 25px 0;">
//         <a href="${process.env.FRONTEND_URL}/payment/${registration._id}" 
//            style="background-color: #4299e1; color: white; padding: 12px 24px; 
//                   text-decoration: none; border-radius: 6px; display: inline-block;">
//           Complete Payment Now
//         </a>
//       </div>
//       <p style="color: #718096;">This link will expire in 24 hours.</p>
//       <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
//         <p>Best regards,<br/>The Teach Assets Hub Team</p>
//       </div>
//     </div>
//   `;

//   await sendEmail({
//     to: registration.email,
//     subject: 'Complete Your English Practice Registration',
//     html
//   });
// };

// // Maintain backward compatibility for existing contact form
// export default sendContactEmails;

////////////////////////OLD ////////////////////////////////

// import nodemailer from 'nodemailer';
// import nodemailerConfig from '../config/nodemailerConfig.js';

// export const sendEmail = async (contact) => {
//   try {
//     if (!contact.email) {
//       throw new Error('Recipient email is not defined.');
//     }

//     const transporter = nodemailer.createTransport({
//       service: nodemailerConfig.service,
//       auth: {
//         user: nodemailerConfig.auth.user,
//         pass: nodemailerConfig.auth.pass,
//       },
//     });

//     // Email to the user
//     const userMailOptions = {
//       from: nodemailerConfig.auth.user,
//       to: contact.email,
//       subject: 'Thank you for contacting us!',
//       text: `Hi ${contact.name},\n\nThank you for reaching out. We have received your message: "${contact.message}".\n\nWe will get back to you soon.\n\nBest regards,\nTeam Tech Assets Hub`,
//     };

//     // Notification email to admin/portal
//     const adminMailOptions = {
//       from: nodemailerConfig.auth.user,
//       to: nodemailerConfig.adminEmail, // Admin/portal email
//       subject: `New Contact Submission from ${contact.name}`,
//       text: `Hi Admin, A new user has reached out to you via the contact form.\n\nDetails:\nName: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}\n\nPlease respond promptly.`,
//     };

//     // Send both emails
//     await transporter.sendMail(userMailOptions);
//     await transporter.sendMail(adminMailOptions);

//     return true;
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//     return false;
//   }
// };
