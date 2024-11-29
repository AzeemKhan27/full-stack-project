

import React from 'react';

const ServiceCategoryCard = ({ title, description, onClick }) => {
  return (
    <div
      className="border rounded-lg shadow-md p-4 bg-gray-100 hover:bg-blue-50 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default ServiceCategoryCard;
