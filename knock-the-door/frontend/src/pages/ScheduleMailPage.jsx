import React, { useState } from 'react';
import axios from 'axios';
import { toast } from '../utils/toast';

const ScheduleMailPage = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverEmails, setReceiverEmails] = useState('');
  const [mailText, setMailText] = useState('');
  const [frequency, setFrequency] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Format the end date with static time 23:59:59.999Z
    const formattedEndDate = `${new Date(endDate).toISOString().split('T')[0]}T23:59:59.999Z`;

    try {
      const response = await axios.post('https://deploy-project-o5u1.onrender.com/api/v1/mails/schedule-mail', {
        senderEmail,
        receiverEmails: receiverEmails.split(',').map(email => email.trim()),
        mailText,
        frequency,
        sendTime,
        endDate: formattedEndDate,
      });

      if (response.status === 200) {
        toast.success('Email scheduled successfully.');
      }
    } catch (error) {
      toast.error('Failed to schedule email. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Schedule Mail</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="senderEmail">Sender Email</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            id="senderEmail"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="receiverEmails">Receiver Emails (comma-separated)</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="receiverEmails"
            value={receiverEmails}
            onChange={(e) => setReceiverEmails(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="mailText">Mail Text</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            id="mailText"
            value={mailText}
            onChange={(e) => setMailText(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="frequency">Frequency (e.g., 1day, 1week)</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="sendTime">Send Time (e.g., 19:21)</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="time"
            id="sendTime"
            value={sendTime}
            onChange={(e) => setSendTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="endDate">End Date (e.g., 2024-10-23)</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Schedule Mail
        </button>
      </form>
    </div>
  );
};

export default ScheduleMailPage;
