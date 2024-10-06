import axios from 'axios';

const API_BASE_URL = 'https://deploy-project-o5u1.onrender.com/api/v1';

export const sendOtp = async (email) => {
  return axios.post(`${API_BASE_URL}/users/login-direct-and-register`, { email });
};

export const registerUser = async ({ email, username }) => {
  return axios.post(`${API_BASE_URL}/users/register`, { email, username });
};

export const verifyOtp = async ({ email, otp }) => {
  return axios.post(`${API_BASE_URL}/users/verify-otp`, { email, otp });
};

export const scheduleMail = async (data) => {
  return axios.post(`${API_BASE_URL}/mails/schedule-mail`, data);
};

export const cancelMail = async (jobId) => {
  return axios.delete(`${API_BASE_URL}/mails/cancel-mail/${jobId}`);
};
