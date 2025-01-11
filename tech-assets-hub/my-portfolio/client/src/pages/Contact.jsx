
// // frontend/components/ContactForm.js
import React, { useState } from 'react';
import apiService from '../services-api/apiService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import BackButton from '../components/BackButton.jsx';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value, country) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.contactForm(formData);
      if (response) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', phoneNumber: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong!';

      // Show toast for generic error
      toast.error('Form not submitted. Please check your input.');

      // Show modal if the user has already submitted a request
      if (errorMessage.includes('already submitted')) {
        setShowModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Back Button (Outside the Form Card) */}
      <div className="absolute top-0 right-0 m-4">
        <BackButton
          text="Back"
          textColor="text-white"
          bgColor="bg-gray-500"
          hoverBgColor="bg-blue-600"
        />
      </div>

      {/* Form Card */}
      {/* <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"> */}
      <div className="p-6 bg-gray-100 shadow-lg rounded-lg max-w-3xl mx-auto m-12">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <PhoneInput
              country={'us'}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phoneNumber',
                required: true,
                autoFocus: true,
              }}
              containerClass="w-full"
              inputClass="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Modal for showing the message */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Request Already Submitted</h2>
              <p className="mb-4">
                You have already submitted a request. Our team will contact you shortly. If you
                haven't received a response within 1-2 days, you can submit again after 24 hours.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;


// import React, { useState } from 'react';
// import apiService from '../services-api/apiService.js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// import BackButton from '../components/BackButton.jsx';
// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     message: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePhoneChange = (value, country) => {
//     setFormData({ ...formData, phoneNumber: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Back Button Code Logic - START
//     if (!courses.length) {
//       return (
//         <div className="flex justify-center items-center h-screen">
//           <div className="flex flex-col items-center text-gray-700 text-sm mb-4">
//             <p className="text-lg font-semibold text-gray-600">No courses found.</p>
//             <BackButton
//               text="Go Back"
//               textColor="text-white"
//               bgColor="bg-blue-500"
//               hoverBgColor="bg-blue-600"
//               className="mt-4"
//             />
//           </div>
//         </div>
//       );
//     }
  
//     // Back Button Code Logic - END

//     try {
//       const response = await apiService.contactForm(formData);
//       if (response) {
//         toast.success('Message sent successfully!');
//         setFormData({ name: '', email: '', phoneNumber: '', message: '' });
//       } else {
//         toast.error('Failed to send message. Please try again.');
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Something went wrong!';
      
//       // Show toast for generic error
//       toast.error('Form not submitted. Please check your input.');

//       // Show modal if the user has already submitted a request
//       if (errorMessage.includes('already submitted')) {
//         setShowModal(true);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
//       {/* back button */}
//       <BackButton
//           text="Back"
//           textColor="text-white"
//           bgColor="bg-blue-500"
//           hoverBgColor="bg-purple-600"
//         />
//         {/* back button */}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">Phone Number</label>
//           <PhoneInput
//             country={'us'}
//             value={formData.phoneNumber}
//             onChange={handlePhoneChange}
//             inputProps={{
//               name: 'phoneNumber',
//               required: true,
//               autoFocus: true
//             }}
//             containerClass="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             inputClass="w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Your Message"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
//           disabled={loading}
//         >
//           {loading ? 'Sending...' : 'Send Message'}
//         </button>
//       </form>

//       {/* Modal for showing the message */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Request Already Submitted</h2>
//             <p>You have already submitted a request. Our team will contact you shortly. If you haven't received a response within 1-2 days, you can submit again after 24 hours.</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactForm;