// // client/src/components/Payment.jsx

import React, { useState } from 'react';
import apiService from '../services-api/apiService.js';

const Payment = ({ course }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');

  const handleRazorpayPayment = async () => {
    if (!name || !email || !phoneNo || !city) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Create order with student details
      const response = await apiService.createOrder({
        courseId: course._id,
        name,
        email,
        phoneNo,
        city,
      });
      const order = response.data;

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: course.price * 100, // Convert to paise (smallest currency unit)
        currency: 'INR', // Currency code
        name: course.title,
        description: course.description,
        order_id: order.id,
        handler: async (response) => {
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            studentId: order.studentId, // Pass studentId from the order response
            courseId: course._id,
          };

          // Verify payment and save details
          const verificationResponse = await apiService.verifyPayment(paymentDetails);
          alert(verificationResponse.data.status);

          // Redirect or show success message
          window.location.href = '/payment-success'; // Example redirect
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

      // Open Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to initiate payment. Please try again.');
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
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleRazorpayPayment}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Invest in Yourself
      </button>
    </div>
  );
};

export default Payment;


// import React from 'react';
// import apiService from '../services-api/apiService.js'

// const Payment = ({ course }) => {
  
//   const handleRazorpayPayment = async () => {
//     try {
//       const response = await apiService.createOrder(course._id);
//       const order = response.data;

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         name: course.title, 
//         description: course.description,
//         order_id: order.id,
//         handler: async (response) => {
//           const paymentDetails = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           const verificationResponse = await apiService.verifyPayment(paymentDetails);

//           alert(verificationResponse.data.status);
//         },
//         prefill: {
//           name: 'Your Name',
//           email: 'techassetshub@gmail.com',
//           contact: '9999999999',
//         },
//         notes: {
//           address: 'Corporate Office',
//         },
//         theme: {
//           color: '#61dafb',
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
    
//       paymentObject.open();
//     } catch (error) {
//       console.error('Error creating order:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleRazorpayPayment} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
//         Invest to yourself
//       </button>
//     </div>
//   );
// };

// export default Payment;
