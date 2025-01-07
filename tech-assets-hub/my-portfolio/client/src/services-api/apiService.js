// src/services-api/apiService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API;

const apiService = {

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


  // PAYMENT GATEWAY API's
  createOrder: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/payments/create-order`, data);
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      // throw error;
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


// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_BASE_URL_API;

// const apiService = {
//   // ==================== Contact Form API ====================
//   contactForm: async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/contact`, data);
//       return response.data;
//     } catch (error) {
//       console.error('Error sending contact form:', error);
//       throw error.response?.data || { message: 'Failed to send contact form.' };
//     }
//   },

//   // ==================== Team Members API ====================
//   getTeamMembers: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/team-members`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching team members:', error);
//       throw error.response?.data || { message: 'Failed to fetch team members.' };
//     }
//   },

//   // ==================== Notification APIs ====================
//   notifyStudent: async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/services/notifications/student/notify-student`,
//         data
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error notifying student:', error);
//       throw error.response?.data || { message: 'Failed to notify student.' };
//     }
//   },

//   notifyClient: async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/services/notifications/client/notify-client`,
//         data
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error notifying client:', error);
//       throw error.response?.data || { message: 'Failed to notify client.' };
//     }
//   },

//   // ==================== Testimonials API ====================
//   getTestimonials: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/testimonials`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching testimonials:', error);
//       throw error.response?.data || { message: 'Failed to fetch testimonials.' };
//     }
//   },

//   // ==================== Join Our Team APIs ====================
//   submitJoinerRequest: async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/services/notifications/about-joiner-request`,
//         data
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error submitting joiner request:', error);
//       if (error.response?.status === 409) {
//         throw { message: 'This email is already registered. Please use a different email.' };
//       }
//       throw error.response?.data || { message: 'Failed to submit joiner request.' };
//     }
//   },

//   // ==================== Payment Gateway APIs ====================
//   createOrder: async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/payments/create-order`, data);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating order:', error);
//       throw error.response?.data || { message: 'Failed to create order.' };
//     }
//   },

//   verifyPayment: async (paymentDetails) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/payments/verify-payment`,
//         paymentDetails
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//       throw error.response?.data || { message: 'Failed to verify payment.' };
//     }
//   },

//   checkEnrollment: async (email, courseId) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/payments/check-enrollment`, {
//         params: { email, courseId },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error checking enrollment:', error);
//       throw error.response?.data || { message: 'Failed to check enrollment.' };
//     }
//   },

//   // ==================== Student Services APIs ====================
//   fetchCoursesByTitle: async (title) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/services/students/courses/search`, {
//         params: { title },
//       });
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       throw error.response?.data || { message: 'Failed to fetch courses.' };
//     }
//   },
// };

// export default apiService;