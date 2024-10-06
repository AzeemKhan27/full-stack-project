import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from '../utils/toast';

const OtpPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://deploy-project-o5u1.onrender.com/api/v1/users/verify-otp', { email, otp });
      if (response.status === 200) {
        toast.success('OTP verified successfully. You are logged in.');
        navigate('/schedule-mail');
      }
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Verify OTP</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="otp">OTP</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpPage;
