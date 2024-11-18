import React from 'react';

const values = [
  "Integrity",
  "Collaboration",
  "Innovation",
  "Excellence",
  "Customer Focus",
];

const OurValues = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Values</h2>
        <ul className="list-disc list-inside text-gray-600">
          {values.map((value, index) => (
            <li key={index} className="mb-2">{value}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurValues;