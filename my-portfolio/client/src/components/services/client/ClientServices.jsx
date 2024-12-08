import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ClientServices = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    email: '',
    message: '',
  });

  const services = [
    'Project Building',
    'Pick Freelancer',
    'Maintenance',
    'Collaborate with us for Futuristic Businesses',
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the form data to your backend
  //   console.log('Form submitted:', formData);
  //   // Reset form after submission
  //   setFormData({
  //     clientName: '',
  //     phoneNumber: '',
  //     email: '',
  //     message: '',
  //   });
  //   setShowForm(false);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const templateParams = {
      client_name: formData.clientName,
      phone_number: formData.phoneNumber,
      email: formData.email,
      message: formData.message,
    };
  
    emailjs
      .send(
        process.env.EmailJS_PRI_KEY,   // Your Service ID
        'YOUR_TEMPLATE_ID',       // Replace with your Template ID
        templateParams,
        process.env.EmailJS_PUB_KEY     // Replace with your Public Key
      )
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Message sent successfully!');
        setFormData({
          clientName: '',
          phoneNumber: '',
          email: '',
          message: '',
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Email sending error:', error);
        alert('Failed to send message. Please try again later.');
      });
  };
  

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Services</h2>
      <div className="relative inline-block text-left mb-4">
        <div>
          <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Client Services
          </button>
        </div>
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => handleServiceClick(service)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us for {selectedService}</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientName">
              Client Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ClientServices;