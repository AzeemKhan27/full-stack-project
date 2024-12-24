// client/src/components/services/student/DropdownCard.jsx


import React, { useState } from 'react';

const DropdownCard = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-lg bg-white p-4 my-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-gray-500">{isOpen ? '▲' : '▼'}</button>
      </div>
      {isOpen && (
        <ul className="mt-2">
          {items.map((item, index) => (
            <li key={index} className="py-1 hover:text-blue-500">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownCard;
