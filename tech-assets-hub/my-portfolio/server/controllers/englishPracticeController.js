// //server/controllers/englishPracticeController.js

///////////////////////Latest NEW:::::::::::::::::::::
// server/controllers/englishPracticeController.js
import EnglishPracticeRegistration from '../models/EnglishPracticeRegistration.js';
import { sendEmail } from '../services/emailService.js';

///////////////////Start/////////////////////////
async function sendConfirmationEmails(registration) {
  // Student email
  await sendEmail({
    to: registration.email,
    subject: 'Payment Successful - English Practice Session',
    html: `
      <p>Hi ${registration.fullName},</p>
      <p>Your payment of ₹${registration.instructorId.pricePerHalfAnHour} was successful!</p>
      <p>Your English partner ${registration.instructorId.name} will contact you at ${registration.email} or ${registration.phone} within 24 hours.</p>
      <p>If the instructor doesn't connect within 24 hours, your money will be refunded automatically.</p>
      <p>Best regards,<br/>Teach Assets Hub Team</p>
    `
  });

  // Instructor email
  await sendEmail({
    to: registration.instructorId.email,
    subject: 'New English Practice Session Booking',
    html: `
      <p>Hi ${registration.instructorId.name},</p>
      <p>You have a new booking from ${registration.fullName}:</p>
      <ul>
        <li>Email: ${registration.email}</li>
        <li>Phone: ${registration.phone}</li>
        <li>City: ${registration.city}</li>
      </ul>
      <p>Please contact the student within 24 hours to schedule the session.</p>
      <p>Best regards,<br/>Teach Assets Hub Team</p>
    `
  });
}

async function sendPaymentReminder(registration) {
  await sendEmail({
    to: registration.email,
    subject: 'Complete Your English Practice Registration',
    html: `
      <p>Hi ${registration.fullName},</p>
      <p>Your registration is almost complete! Please complete the payment process to confirm your session.</p>
      <p><a href="${process.env.FRONTEND_URL}/payment/${registration._id}">Complete Payment Now</a></p>
      <p>Best regards,<br/>Teach Assets Hub Team</p>
    `
  });
}

export const updatePaymentStatus = async (req, res) => {
  try {
    const registration = await EnglishPracticeRegistration.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: req.body.status,
        paidAt: req.body.status === 'Paid' ? new Date() : null
      },
      { new: true }
    ).populate('instructorId');

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    if (req.body.status === 'Paid') {
      await sendConfirmationEmails(registration);
    } else if (req.body.status === 'Failed') {
      await sendPaymentReminder(registration);
    }

    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//////////////////END////////////////////////////

export const registerForEnglishPractice = async (req, res) => {
  try {
    const { fullName, email, phone, city, country, age, instructorId } = req.body;

    const registration = new EnglishPracticeRegistration({
      fullName,
      email,
      phone,
      city,
      country, 
      age,
      instructorId,
    });

    await registration.save();

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



///////////////////////Latest NEW:::::::::::::::::::::

// // server/controllers/englishPracticeController.js
// import EnglishPracticeRegistration from '../models/EnglishPracticeRegistration.js';
// import { sendEmail } from '../services/emailService.js';

// ///////////////////Start/////////////////////////
// async function sendConfirmationEmails(registration) {
//   // Student email
//   await sendEmail({
//     to: registration.email,
//     subject: 'Payment Successful - English Practice Session',
//     html: `
//       <p>Hi ${registration.fullName},</p>
//       <p>Your payment of ₹${registration.instructorId.pricePerHalfAnHour} was successful!</p>
//       <p>Your English partner ${registration.instructorId.name} will contact you at ${registration.email} or ${registration.phone} within 24 hours.</p>
//       <p>If the instructor doesn't connect within 24 hours, your money will be refunded automatically.</p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });

//   // Instructor email
//   await sendEmail({
//     to: registration.instructorId.email,
//     subject: 'New English Practice Session Booking',
//     html: `
//       <p>Hi ${registration.instructorId.name},</p>
//       <p>You have a new booking from ${registration.fullName}:</p>
//       <ul>
//         <li>Email: ${registration.email}</li>
//         <li>Phone: ${registration.phone}</li>
//         <li>City: ${registration.city}</li>
//       </ul>
//       <p>Please contact the student within 24 hours to schedule the session.</p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });
// }

// async function sendPaymentReminder(registration) {
//   await sendEmail({
//     to: registration.email,
//     subject: 'Complete Your English Practice Registration',
//     html: `
//       <p>Hi ${registration.fullName},</p>
//       <p>Your registration is almost complete! Please complete the payment process to confirm your session.</p>
//       <p><a href="${process.env.FRONTEND_URL}/payment/${registration._id}">Complete Payment Now</a></p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });
// }

// export const updatePaymentStatus = async (req, res) => {
//   try {
//     const registration = await EnglishPracticeRegistration.findByIdAndUpdate(
//       req.params.id,
//       {
//         paymentStatus: req.body.status,
//         paidAt: req.body.status === 'Paid' ? new Date() : null
//       },
//       { new: true }
//     ).populate('instructorId');

//     if (!registration) {
//       return res.status(404).json({ success: false, message: 'Registration not found' });
//     }

//     if (req.body.status === 'Paid') {
//       await sendConfirmationEmails(registration);
//     } else if (req.body.status === 'Failed') {
//       await sendPaymentReminder(registration);
//     }

//     res.status(200).json({ success: true, data: registration });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// //////////////////END////////////////////////////

// export const registerForEnglishPractice = async (req, res) => {
//   try {
//     const { fullName, email, phone, city, instructorId } = req.body;

//     const registration = new EnglishPracticeRegistration({
//       fullName,
//       email,
//       phone,
//       city,
//       instructorId,
//     });

//     await registration.save();

//     res.status(201).json({ success: true, data: registration });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import EnglishPracticeRegistration from '../models/EnglishPracticeRegistration.js';
// import { sendEmail } from '../services/emailService.js';

// ///////////////////Start/////////////////////////

// // Update sendConfirmationEmails
// async function sendConfirmationEmails(registration) {
//   // Student email
//   await sendEmail({
//     to: registration.email,
//     subject: 'Payment Successful - English Practice Session',
//     html: `
//       <p>Hi ${registration.fullName},</p>
//       <p>Your payment of ₹${registration.instructorId.pricePerHalfAnHour} was successful!</p>
//       <p>Your instructor ${registration.instructorId.name} will contact you within 24 hours at:</p>
//       <ul>
//         <li>Email: ${registration.email}</li>
//         <li>Phone: ${registration.phone}</li>
//       </ul>
//       <p>If you don't hear from the instructor within 24 hours, you'll receive an automatic refund.</p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });

//   // Instructor email
//   await sendEmail({
//     to: registration.instructorId.email,
//     subject: 'New Practice Session Booking',
//     html: `
//       <p>Hi ${registration.instructorId.name},</p>
//       <p>You have a new booking:</p>
//       <ul>
//         <li>Student: ${registration.fullName}</li>
//         <li>Email: ${registration.email}</li>
//         <li>Phone: ${registration.phone}</li>
//         <li>City: ${registration.city}</li>
//         <li>Amount: ₹${registration.instructorId.pricePerHalfAnHour}</li>
//       </ul>
//       <p>Please contact the student within 24 hours to schedule the session.</p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });
// };

// export const updatePaymentStatus = async (req, res) => {
//   try {
//     const registration = await EnglishPracticeRegistration.findByIdAndUpdate(
//       req.params.id,
//       {
//         paymentStatus: req.body.status,
//         paidAt: req.body.status === 'Paid' ? new Date() : null
//       },
//       { new: true }
//     ).populate('instructorId');

//     if (!registration) {
//       return res.status(404).json({ success: false, message: 'Registration not found' });
//     }

//     // Send emails
//     if (req.body.status === 'Paid') {
//       await sendConfirmationEmails(registration);
//     } else if (req.body.status === 'Failed') {
//       await sendPaymentReminder(registration);
//     }

//     res.status(200).json({ success: true, data: registration });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// async function sendConfirmationEmails(registration) {
//   // Student email
//   await sendEmail({
//     to: registration.email,
//     subject: 'Payment Successful - English Practice Session',
//     html: `
//       <p>Hi ${registration.fullName},</p>
//       <p>Your payment of ₹${registration.instructorId.pricePerHalfAnHour} was successful!</p>
//       <p>Your English partner ${registration.instructorId.name} will contact you at ${registration.email} or ${registration.phone} within 24 hours.</p>
//       <p>If the instructor doesn't connect within 24 hours, your money will be refunded automatically.</p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });

//   // Instructor email
//   await sendEmail({
//     to: registration.instructorId.email,
//     subject: 'New English Practice Session Booking',
//     html: `
//       <p>Hi ${registration.instructorId.name},</p>
//       <p>You have a new booking from ${registration.fullName}:</p>
//       <ul>
//         <li>Email: ${registration.email}</li>
//         <li>Phone: ${registration.phone}</li>
//         <li>City: ${registration.city}</li>
//       </ul>
//       <p>Please contact the student within 24 hours to schedule the session.</p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });
// }

// async function sendPaymentReminder(registration) {
//   await sendEmail({
//     to: registration.email,
//     subject: 'Complete Your English Practice Registration',
//     html: `
//       <p>Hi ${registration.fullName},</p>
//       <p>Your registration is almost complete! Please complete the payment process to confirm your session.</p>
//       <p><a href="${process.env.FRONTEND_URL}/payment/${registration._id}">Complete Payment Now</a></p>
//       <p>Best regards,<br/>Teach Assets Hub Team</p>
//     `
//   });
// }
// //////////////////END////////////////////////////

// export const registerForEnglishPractice = async (req, res) => {
//   try {
//     const { fullName, email, phone, city, instructorId } = req.body;

//     const registration = new EnglishPracticeRegistration({
//       fullName,
//       email,
//       phone,
//       city,
//       instructorId,
//     });

//     await registration.save();

//     res.status(201).json({ success: true, data: registration });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };