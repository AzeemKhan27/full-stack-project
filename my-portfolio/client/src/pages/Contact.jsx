import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.status === 201) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phoneNumber: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="block mb-4 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="block mb-4 p-2 border rounded"
      />
      <input
        type="number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Your Phone Number"
        required
        className="block mb-4 p-2 border rounded"
      />
      
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
        className="block mb-4 p-2 border rounded"
      ></textarea>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Send Message
      </button>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </form>
  );
};

export default ContactForm;
