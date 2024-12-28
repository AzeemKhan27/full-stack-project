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
};

export default apiService;
