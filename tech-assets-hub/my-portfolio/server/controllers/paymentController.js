import Razorpay from 'razorpay';
import config from '../config/config.js';
import Course from '../models/Course.js';
import Student from '../models/Student.js';
import Payment from '../models/Payment.js';
import crypto from 'crypto';
import { transporter } from '../utils/sendEmail.js'; // Reuse your existing email transporter

const razorpay = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret,
});

const createOrder = async (req, res) => {
  const { courseId, name, email, phoneNo, city } = req.body;

  if (!courseId || !name || !email || !phoneNo || !city) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Check if the student already exists
    let student = await Student.findOne({ email });

    console.log('Student: ', student);


    if (!student) {
      // Create a new student if they don't exist
      student = await Student.create({
        name,
        email,
        phoneNo,
        city,
        enrolledCourses: [course._id], // Save course ID instead of title
      });
    } else {
      // Update the existing student's enrolledCourses if the course is not already enrolled
      if (!student.enrolledCourses.includes(course._id)) {
        student.enrolledCourses.push(course._id);
        await student.save();
      }
    }

    // Create a Razorpay order
    const options = {
      amount: course.price * 100, // Amount in smallest currency unit (e.g., paise for INR)
      currency: 'INR',
      receipt: `order_rcptid_${courseId}`,
      payment_capture: 1,
      notes: {
        courseName: course.title,
        courseDescription: course.description,
      },
    };

    razorpay.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ order, studentId: student._id });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, studentId, courseId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !studentId || !courseId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Verify the payment signature
    const hmac = crypto.createHmac('sha256', config.razorpayKeySecret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ status: 'Payment Failed' });
    }

    // Fetch the student and course details
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    console.log('Student: ', student);
    console.log('Payment: ', payment);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or course not found.' });
    }

    // Save payment details to the Payment model
    const payment = await Payment.create({
      studentId: student._id,
      courseId: course._id,
      name: student.name,
      email: student.email,
      phoneNo: student.phoneNo,
      city: student.city,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: 'success',
    });

    console.log("payment : ", payment)

    // Send confirmation email to the student
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: `Payment Confirmation for ${course.title}`,
      html: `
        <h2>Hi ${student.name},</h2>
        <p>Your payment for the course <strong>${course.title}</strong> has been successfully processed.</p>
        <p>Here are your payment details:</p>
        <ul>
          <li><strong>Order ID:</strong> ${razorpay_order_id}</li>
          <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
          <li><strong>Amount Paid:</strong> ₹${course.price}</li>
        </ul>
        <p>Thank you for choosing us!</p>
        <p>Best regards,<br>Team Tech Assets Hub.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ status: 'Payment Successful', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//CHECK Enrolled Course

const checkEnrollment = async (req, res) => {
  const { email, courseId } = req.query;

  if (!email || !courseId) {
    return res.status(400).json({ message: 'Email and course ID are required.' });
  }

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.json({ isEnrolled: false }); // Student not found, not enrolled
    }

    // Check if the student is already enrolled in the course
    const isEnrolled = student.enrolledCourses.includes(courseId);
    res.json({ isEnrolled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { createOrder, verifyPayment, checkEnrollment };


// backend/controllers/paymentController.js

// import Razorpay from 'razorpay';
// import config from '../config/config.js';
// import Course from '../models/Course.js';
// import crypto from 'crypto';

// const razorpay = new Razorpay({
//   key_id: config.razorpayKeyId,
//   key_secret: config.razorpayKeySecret,
// });

// const createOrder = async (req, res) => {
//   const { courseId } = req.body;

//   try {
//     const course = await Course.findById({_id: courseId });

//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }



//     const options = {
//       amount: course.price * 100, // amount in the smallest currency unit
//       currency: 'INR',
//       receipt: `order_rcptid_${courseId}`,
//       payment_capture: 1,
//       notes: {
//         courseName: course.title,
//         courseDescription: course.description,
//       },
//     };

//     razorpay.orders.create(options, (err, order) => {
//       if (err) {
//         return res.status(500).json({ error: err });
//       }
//       res.json(order);
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const verifyPayment = async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   try {
//     const attributes = {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     };

//     const hmac = crypto.createHmac('sha256', config.razorpayKeySecret);
//     hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
//     const generated_signature = hmac.digest('hex');

//     if (generated_signature === razorpay_signature) {
//       res.json({ status: 'Payment Successful' });
//     } else {
//       res.status(400).json({ status: 'Payment Failed' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export { createOrder, verifyPayment };
