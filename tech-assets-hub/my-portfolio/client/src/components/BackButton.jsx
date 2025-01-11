import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({
  text = 'Back', // Default button text
  textColor = 'text-white', // Default text color
  bgColor = 'bg-gray-500', // Default background color
  hoverBgColor = 'bg-gray-600', // Default hover background color
  className = '', // Additional custom classes
  onClick, // Custom onClick handler
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick(); // Custom onClick handler if provided
    } else {
      navigate(-1); // Default behavior: navigate back
    }
  };

  return (
    <button
      className={`${bgColor} ${textColor} px-4 py-2 rounded hover:${hoverBgColor} transition duration-300 ${className}`}
      onClick={handleBack}
    >
      {text}
    </button>
  );
};

export default BackButton;