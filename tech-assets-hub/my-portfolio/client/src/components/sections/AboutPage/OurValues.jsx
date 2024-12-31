import React from 'react';
import { FaHandshake, FaUsers, FaLightbulb, FaTrophy, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../AboutPage/css/OurValues.css'; // Import the CSS file for the gradient animation

const values = [
  { icon: FaHandshake, text: "Integrity" },
  { icon: FaUsers, text: "Collaboration" },
  { icon: FaLightbulb, text: "Innovation" },
  { icon: FaTrophy, text: "Excellence" },
  { icon: FaUserTie, text: "Customer Focus" },
];

const OurValues = () => {
  return (
    <section className="py-16 bg-gradient-animated">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-800 mb-8"
        >
          Our Values
        </motion.h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md text-gray-700 text-lg font-semibold transition duration-300 hover:shadow-lg hover:bg-gray-50 transform hover:scale-105"
            >
              <value.icon className="text-4xl mb-4 text-blue-500 mx-auto" />
              <p>{value.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurValues;
