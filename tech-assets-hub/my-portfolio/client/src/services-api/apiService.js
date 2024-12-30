// src/services-api/apiService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API;

const apiService = {
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
      return response.data;
    } catch (error) {
      console.error('Error notifying student:', error);
      throw error;
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

};

export default apiService;
