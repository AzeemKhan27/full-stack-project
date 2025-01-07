
import "./css/ServiceDetail.css"; // Import the CSS for modal styling
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../../../services-api/apiService.js";
import Modal from 'react-modal'; // Import the Modal component
import { toast, ToastContainer } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Set the root element for accessibility (required by react-modal)
Modal.setAppElement('#root');

const ServiceDetail = () => {
  const { serviceType } = useParams();
  const decodedServiceType = decodeURIComponent(serviceType);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value, country) => {
    setForm({ ...form, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.age || !form.phone || !form.email || !form.message) {
      setValidationModalIsOpen(true);
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.notifyStudent({
        ...form,
        serviceType: decodedServiceType,
      });

      if (response.status === 200) {
        toast.success("Form submitted successfully.");
        setForm({ name: "", age: "", phone: "", email: "", message: "" });
      } else {
        toast.error("Failed to submit the form.");
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

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer /> {/* Add the ToastContainer component */}
      <h1 className="text-2xl font-bold mb-4">{decodedServiceType.toUpperCase()}</h1>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleBack}
      >
        Back
      </button>
      <form className="bg-gray-100 p-4 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Student Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <PhoneInput
            country={'us'}
            value={form.phone}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
            containerClass="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            inputClass="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Modal for validation message */}
      <Modal
        isOpen={validationModalIsOpen}
        onRequestClose={() => setValidationModalIsOpen(false)}
        contentLabel="Validation Error"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">Validation Error</h2>
        <p className="mb-4">All fields are required.</p>
        <button
          onClick={() => setValidationModalIsOpen(false)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </Modal>

      {/* Modal for showing the message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Request Already Submitted</h2>
            <p>You have already submitted a request. Our team will contact you shortly. If you haven't received a response within 1-2 days, you can submit again after 24 hours.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
