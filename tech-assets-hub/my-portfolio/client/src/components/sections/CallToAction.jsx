// CallToAction.js
import React from 'react';
import './css/CallToAction.css'; // Import the CSS file

const headline = "Join us today and take your project to the next level with our expert team.";

const CallToAction = () => {
  return (
    <div className="bg-blue-600 text-white p-8 rounded-lg text-center my-2">
      <h2 className="text-2xl font-bold mb-2">Ready to Get Started?</h2>
      <p className="text-lg mb-4">
        {headline}
      </p>
      <a
        href="/contact"
        className="bg-white text-blue-600 font-bold py-2 px-4 rounded transition duration-300 hover:bg-blue-500 hover:text-white"
      >
        Contact Us
      </a>
    </div>
  );
};

export default CallToAction;