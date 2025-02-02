// src/pages/PrivacyPolicy.js

import React, { useEffect, useState } from 'react';
import apiService from '../services-api/apiService';
import '../pages/css/PrivacyPolicy.css'; // Import the CSS file

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState('');

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const data = await apiService.getPrivacyPolicy();
        setPolicy(data.policy);
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <div dangerouslySetInnerHTML={{ __html: policy }} />
    </div>
  );
};

export default PrivacyPolicy;
