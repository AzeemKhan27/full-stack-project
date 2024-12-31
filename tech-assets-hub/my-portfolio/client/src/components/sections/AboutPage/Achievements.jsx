import React from 'react';
import { motion } from 'framer-motion';
import '../AboutPage/css/Achievements.css'; // Import the CSS file for the gradient animation

const achievements = [
  { id: 1, text: "Over 10+ successful projects completed" },
  { id: 2, text: "25+ satisfied clients" },
  { id: 3, text: "Awarded 'Best Freelance Support' in 2022" },
  { id: 4, text: "Recognized for partnerships with leading IT startups" },
];

const Achievements = () => {
  return (
    <section className="py-16 bg-gradient-animated_achievement">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-gray-800 mb-8"
        >
          Achievements
        </motion.h2>
        <ul className="list-disc list-inside text-gray-700 space-y-4">
          {achievements.map(({ id, text }) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: id * 0.2 }}
              className="text-lg hover:text-blue-600 transition-colors duration-300"
            >
              {text}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achievements;
