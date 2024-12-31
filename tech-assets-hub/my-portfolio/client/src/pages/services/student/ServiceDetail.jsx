//client/src/pages/services/student/ServiceDetail.jsx

//-----------------------------------------------------------

import React, { useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";

import apiService from "../../../services-api/apiService.js"

const ServiceDetail = () => {
  const { serviceType } = useParams();
  const decodedServiceType = decodeURIComponent(serviceType);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "", message: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(`${BASE_URL_API}/api/services/notifications/student/notify-student`, {
      //   ...form,
      //   serviceType: decodedServiceType,
      // });

      const response = await apiService.notifyStudent({
        ...form,
        serviceType: decodedServiceType,
      });

      console.log("RESPONSE: " , response.status); 

     
      if (response.status === 200) {
        alert("Form submitted successfully.");
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      alert("An error occurred while submitting the form.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">{decodedServiceType}</h1>
    <button
      className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      onClick={handleBack}
    >
      Back
    </button>
    <form className="bg-gray-100 p-4 rounded shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
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
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
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
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Submit
      </button>
    </form>
  </div>
);
};

export default ServiceDetail;
