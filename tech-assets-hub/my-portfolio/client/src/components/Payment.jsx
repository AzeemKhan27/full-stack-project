

// client/src/components/Payment.jsx

// import React, { useState, useEffect } from 'react';
// import apiService from '../services-api/apiService.js';
// import Modal from 'react-modal';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useLocation } from 'react-router-dom';

// // Set the root element for accessibility (required by react-modal)
// Modal.setAppElement('#root');

// const Payment = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNo, setPhoneNo] = useState('');
//   const [city, setCity] = useState('');
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [enrollmentModalIsOpen, setEnrollmentModalIsOpen] = useState(false);
//   const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
//   const location = useLocation();
//   const { registrationId, instructor } = location.state || {};

//   const handleRazorpayPayment = async () => {
//     if (!name || !email || !phoneNo || !city) {
//       setValidationModalIsOpen(true);
//       toast.error('Please fill all fields.');
//       return;
//     }

//     try {
//       const enrollmentResponse = await apiService.checkEnrollment(email, course._id);
//       if (enrollmentResponse.data.isEnrolled) {
//         setIsEnrolled(true);
//         setEnrollmentModalIsOpen(true);
//         return;
//       }

//       const response = await apiService.createOrder({
//         courseId: course._id,
//         name,
//         email,
//         phoneNo,
//         city,
//         paymentType: 'english-practice',
//         registrationId,
//       });
//       const order = response.data;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: 500 * 100, // Amount in paise
//         currency: 'INR',
//         name: 'English Practice',
//         description: 'English Practice Session',
//         order_id: order.id,
//         handler: async (response) => {
//           const paymentDetails = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             studentId: order.studentId,
//             courseId: null,
//             paymentType: 'english-practice',
//             registrationId,
//           };

//           const verificationResponse = await apiService.verifyPayment(paymentDetails);
//           toast.success(verificationResponse.data.status);
//           window.location.href = '/payment-success';
//         },
//         prefill: {
//           name,
//           email,
//           contact: phoneNo,
//         },
//         notes: {
//           address: city,
//         },
//         theme: {
//           color: '#61dafb',
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (error) {
//       console.error('Error creating order:', error);
//       toast.error('Failed to initiate payment. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (registrationId && instructor) {
//       setName(instructor.fullName);
//       setEmail(instructor.email);
//       setPhoneNo(instructor.phone);
//       setCity(instructor.city);
//     }
//   }, [registrationId, instructor]);

//   return (
//     <div className="mt-4">
//       <button
//         onClick={handleRazorpayPayment}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
//       >
//         Book English Practice Session
//       </button>

//       {/* Modal for already enrolled students */}
//       <Modal
//         isOpen={enrollmentModalIsOpen}
//         onRequestClose={() => setEnrollmentModalIsOpen(false)}
//         contentLabel="Already Enrolled"
//         className="modal sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto p-4 bg-white rounded-lg shadow-lg"
//         overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         <h2 className="text-xl font-bold mb-4">Already Enrolled</h2>
//         <p className="mb-4">
//           You have already enrolled in this course. Please choose another course.
//         </p>
//         <button
//           onClick={() => setEnrollmentModalIsOpen(false)}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//         >
//           Close
//         </button>
//       </Modal>

//       {/* Modal for missing fields */}
//       <Modal
//         isOpen={validationModalIsOpen}
//         onRequestClose={() => setValidationModalIsOpen(false)}
//         contentLabel="Missing Fields"
//         className="modal sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto p-4 bg-white rounded-lg shadow-lg"
//         overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       >
//         <h2 className="text-xl font-bold mb-4">Missing Fields</h2>
//         <p className="mb-4">
//           Please fill in all fields (Name, Email, Phone Number, City) to proceed.
//         </p>
//         <button
//           onClick={() => setValidationModalIsOpen(false)}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//         >
//           Close
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default Payment;




// :::::::::::::::::::::::::::::::::::::::::::::::


import React, { useState } from 'react';
import apiService from '../services-api/apiService.js';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set the root element for accessibility (required by react-modal)
Modal.setAppElement('#root');

const Payment = ({ course }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentModalIsOpen, setEnrollmentModalIsOpen] = useState(false);
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);

  const handleRazorpayPayment = async () => {
    if (!name || !email || !phoneNo || !city) {
      setValidationModalIsOpen(true);
      toast.error('Please fill all fields.');
      return;
    }

    try {
      const enrollmentResponse = await apiService.checkEnrollment(email, course._id);
      if (enrollmentResponse.data.isEnrolled) {
        setIsEnrolled(true);
        setEnrollmentModalIsOpen(true);
        return;
      }

      const response = await apiService.createOrder({
        courseId: course._id,
        name,
        email,
        phoneNo,
        city,
      });
      const order = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: course.price * 100,
        currency: 'INR',
        name: course.title,
        description: course.description,
        order_id: order.id,
        handler: async (response) => {
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            studentId: order.studentId,
            courseId: course._id,
          };

          const verificationResponse = await apiService.verifyPayment(paymentDetails);
          toast.success(verificationResponse.data.status);
          window.location.href = '/payment-success';
        },
        prefill: {
          name,
          email,
          contact: phoneNo,
        },
        notes: {
          address: city,
        },
        theme: {
          color: '#61dafb',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="mt-4">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleRazorpayPayment}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
      >
        Invest in Yourself
      </button>

      {/* Modal for already enrolled students */}
      <Modal
        isOpen={enrollmentModalIsOpen}
        onRequestClose={() => setEnrollmentModalIsOpen(false)}
        contentLabel="Already Enrolled"
        className="modal sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto p-4 bg-white rounded-lg shadow-lg"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Already Enrolled</h2>
        <p className="mb-4">
          You have already enrolled in this course. Please choose another course.
        </p>
        <button
          onClick={() => setEnrollmentModalIsOpen(false)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </Modal>

      {/* Modal for missing fields */}
      <Modal
        isOpen={validationModalIsOpen}
        onRequestClose={() => setValidationModalIsOpen(false)}
        contentLabel="Missing Fields"
        className="modal sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto p-4 bg-white rounded-lg shadow-lg"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Missing Fields</h2>
        <p className="mb-4">
          Please fill in all fields (Name, Email, Phone Number, City) to proceed.
        </p>
        <button
          onClick={() => setValidationModalIsOpen(false)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Payment;

// ::::::::::::::::::::::::::::::::::::::::::::::::::::
