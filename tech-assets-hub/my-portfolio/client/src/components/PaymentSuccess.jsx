// client/src/components/PaymentSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 mb-8">Thank you for your purchase. We have sent a confirmation email to your inbox.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;