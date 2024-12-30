// src/components/sections/JoinOurTeam.jsx

import React, { useState } from 'react';
import apiService from '../../services-api/apiService.js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const JoinOurTeam = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    state: '',
    fullAddress: '',
    phoneNo: '',
    emailId: '',
    qualification: '',
    skills: '',
    experience: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (val) => {
    setFormData((prevData) => ({
      ...prevData,
      country: val,
    }));
  };

  const handleRegionChange = (val) => {
    setFormData((prevData) => ({
      ...prevData,
      state: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await apiService.submitJoinerRequest(formData);
      setStatusMessage(response.message);
      // Clear form fields after successful submission
      setFormData({
        name: '',
        country: '',
        state: '',
        fullAddress: '',
        phoneNo: '',
        emailId: '',
        qualification: '',
        skills: '',
        experience: '',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong!';
      setStatusMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Join Our Freelancing Team</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
            <CountryDropdown
              id="country"
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700 mb-2">State</label>
            <RegionDropdown
              id="state"
              name="state"
              country={formData.country}
              value={formData.state}
              onChange={handleRegionChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullAddress" className="block text-gray-700 mb-2">Full Address</label>
            <input
              type="text"
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="emailId" className="block text-gray-700 mb-2">Email ID</label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="qualification" className="block text-gray-700 mb-2">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block text-gray-700 mb-2">Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-gray-700 mb-2">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {statusMessage && <p className="mt-4 text-red-500">{statusMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default JoinOurTeam;