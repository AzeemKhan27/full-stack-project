import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../../../services-api/apiService.js";
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./css/ServiceDetail.css";

// Set the root element for accessibility
Modal.setAppElement('#root');

const ServiceDetail = () => {
  const { serviceType } = useParams();
  const decodedServiceType = decodeURIComponent(serviceType);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [validationModalIsOpen, setValidationModalIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // State to store modal message

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

      console.log("Backend response:", response); // Debugging line

      if (response.status === 200) {
        toast.success("Form submitted successfully.");
        setForm({ name: "", age: "", phone: "", email: "", message: "" });
        setSuccessModalIsOpen(true); // Show success modal
      } else if (response.status === 409) {
        setModalMessage(response.data.message); // Set the detailed error message
        setShowModal(true); // Show the modal
      } else {
        toast.error("Failed to submit the form.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong!';
      const errorDetails = error.response?.data?.details || ''; // Get detailed error message
      console.log("Error message:", errorMessage); // Debugging line

      // Show modal if the user has already submitted a request for the same serviceType
      if (errorMessage.toLowerCase().includes('already submitted')) {
        setModalMessage(errorDetails); // Set the detailed error message
        setShowModal(true); // Show the modal
      } else {
        // Show toast for other errors
        toast.dismiss(); // Clear any active toasts
        toast.error('Form not submitted. Please check your input.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
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
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Request Already Submitted"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">Request Already Submitted</h2>
        <p>{modalMessage}</p>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={() => setSuccessModalIsOpen(false)}
        contentLabel="Form Submitted Successfully"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">Form Submitted Successfully</h2>
        <p>Hi {form.name}, we have received your details for <strong>{decodedServiceType}</strong>. Our team will contact you shortly. Please allow us 24 hours to revert. Thank you!</p>
        <button
          onClick={() => setSuccessModalIsOpen(false)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ServiceDetail;
