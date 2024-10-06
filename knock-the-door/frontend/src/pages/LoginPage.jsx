import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from '../utils/toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://deploy-project-o5u1.onrender.com/api/v1/users/login-direct-and-register', { email });
      if (response.status === 200) {
        toast.success('OTP sent successfully. Please check your email.');
        navigate('/verify-otp');
      }
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Login</h2>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
