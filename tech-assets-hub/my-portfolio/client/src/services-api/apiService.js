// src/services-api/apiService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API;

const apiService = {

  //privacy-policy
  getPrivacyPolicy: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/privacy-policy`);
      console.log("API_BASE_URL response : ", response ? undefined : response)
      return response.data;
    } catch (error) {
      console.error('Error fetching : getPrivacyPolicy :', error.message);
      throw error;
    }
  },

  //terms-of-service
  getTermsOfService: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/terms-of-service/`);
      console.log("API_BASE_URL : getTermsOfService : response : ", response ? undefined : response)
      return response.data;
    } catch (error) {
      console.error('Error fetching terms of service:', error);
      throw error;
    }
  },

  updateRegistrationPayment: async (registrationId, paymentData) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/register-for-english-practice/registrations/${registrationId}/payment`,
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  },
  saveFormDataForEnglishPractitioners: async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/register-for-english-practice/register`, 
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error saving form data:', error);
      throw error;
    }
  },

  getInstructors: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/english-instructors/getAll`);
      console.log("response: get All instructor : ", response)
      return response.data;
    } catch (error) {
      console.error('Error fetching instructors:', error);
      throw error;
    }
  },

  sendEnglishPracticeNotification: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/notifications/english-practice/notify`, data);
      return response.data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  },

  createOrder: async (data) => {
    console.log('Creating order : ',data)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/payments/create-order`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  //Contact Form Api:
  contactForm: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact`, data);
      return response.data;
    } catch (error) {
      console.error('Error sending contact form:', error);
      throw error;
    }
  },
  getTeamMembers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/team-members`);
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },

  notifyStudent: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/services/notifications/student/notify-student`, data);
      console.log("RESPONSE : ",response);
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error notifying student:', error.response);
        throw error.response; // Throw the entire response object
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error notifying student:', error.request);
        throw new Error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error notifying student:', error.message);
        throw new Error('Something went wrong!');
      }
    }
  },

  notifyClient: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/services/notifications/client/notify-client`, data);
      return response.data;
    } catch (error) {
      console.error('Error notifying client:', error);
      throw error;
    }
  },

  // New method to fetch testimonials
  getTestimonials: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/testimonials`);
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  // Join Our Team API's
  submitJoinerRequest: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/services/notifications/about-joiner-request`, data);
      return response.data;
    } catch (error) {
      console.error('Error submitting joiner request:', error);
      if (error.response?.status === 409) {
        throw { message: 'This email is already registered. Please use a different email.' };
      }
      throw error.response?.data || { message: 'Something went wrong!' };
    }
  },


  verifyPayment: async (paymentDetails) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/payments/verify-payment`, paymentDetails);
      return response;
    } catch (error) {
      console.error('Error verifying payment:', error);
      // throw error;
    }
  },

  // Check if the student is already enrolled in the course
  checkEnrollment: async (email, courseId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/payments/check-enrollment`, {
        params: { email, courseId },
      });
      return response;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      throw error;
    }
  },

 // ==================== Student Services APIs ====================
  fetchCoursesByTitle: async (title) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/services/students/courses/search`, {
        params: { title },
      });
      console.log("API response: " + response)
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error.response?.data || { message: 'Failed to fetch courses.' };
    }
  },
};

export default apiService;