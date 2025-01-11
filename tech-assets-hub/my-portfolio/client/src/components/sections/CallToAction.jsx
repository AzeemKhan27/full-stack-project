// // src/components/CallToAction.css
import React from 'react';
import './css/CallToAction.css';

const CallToAction = ({ headline }) => {
  return (
    <div className="cta-container bg-gradient-to-r from-blue-400 to-blue-600 text-white p-8 rounded-lg text-center my-8 shadow-lg">
      <h2 className="cta-title text-3xl font-extrabold mb-2">Ready to Get Started?</h2>
      <p className="cta-description text-lg mb-4">{headline}</p>
      <a href="/contact" className="cta-button bg-white text-blue-600 font-bold py-2 px-6 rounded-lg transition duration-300 hover:bg-blue-500 hover:text-white shadow-md transform hover:scale-105">
        Contact Us
      </a>
    </div>
  );
};

export default CallToAction;