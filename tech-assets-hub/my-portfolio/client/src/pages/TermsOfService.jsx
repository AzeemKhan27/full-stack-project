// src/pages/TermsOfService.js

import React, { useEffect, useState } from 'react';
import apiService from '../services-api/apiService';
import '../pages/css/TermsOfService.css'; // Import the CSS file

const TermsOfService = () => {
  const [terms, setTerms] = useState('');

  useEffect(() => {
    const fetchTermsOfService = async () => {
      try {
        const data = await apiService.getTermsOfService();
        setTerms(data.terms);
      } catch (error) {
        console.error('Error fetching terms of service:', error);
      }
    };

    fetchTermsOfService();
  }, []);

  return (
    <div className="terms-of-service">
      <h1>Terms of Service</h1>
      <div dangerouslySetInnerHTML={{ __html: terms }} />
    </div>
  );
};

export default TermsOfService;
