// AboutOurFreelance.jsx

import React from 'react';

const aboutusMsg = "we mentioned all details and information about us,please find your time to read it."

const AboutOurFreelance = ({ title, message }) => {
  return (
    
    <div className="bg-white-500 text-center m-12">
      <span className="text-4xl font-bold">About us</span>
      <p className="text-gray-600 m-4 text-md">
          {aboutusMsg}
        </p>
      <div className="sm:flex items-center max-w-screen-xl mx-auto p-5">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="../../public/sections/home-about-section.png" alt="Company Image" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
        
          <div className="text">
            
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              About <span className="text-indigo-600">{title}</span>
            </h2>
            <p className="text-gray-700">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOurFreelance;