// client/src/components/Payment.jsx
import React from 'react';
import apiService from '../services-api/apiService.js'

const Payment = ({ course }) => {
  
  const handleRazorpayPayment = async () => {
    try {
      const response = await apiService.createOrder(course.courseId);
      const order = response.data;

      console.log("COURSE_ID: ", order)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        name: 'Course Payment',
        description: 'Payment for course',
        order_id: order.id,
        handler: async (response) => {
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verificationResponse = await apiService.verifyPayment(paymentDetails);

          alert(verificationResponse.data.status);
        },
        prefill: {
          name: 'What is your Name',
          email: 'techassetshub@gmail.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Corporate Office',
        },
        theme: {
          color: '#61dafb',
        },
      };

      const paymentObject = new window.Razorpay(options);
      console.log('Payment Object : ', paymentObject)
      paymentObject.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <button onClick={handleRazorpayPayment} className="bg-blue-500 text-white px-4 py-2 rounded">
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
