import React from 'react';

const achievements = [
  "Over 100 successful projects completed",
  "500+ satisfied clients",
  "Awarded 'Best Freelance Platform' in 2022",
  "Established partnerships with leading companies",
];

const Achievements = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Achievements</h2>
        <ul className="list-disc list-inside text-gray-600">
          {achievements.map((achievement, index) => (
            <li key={index} className="mb-2">{achievement}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achievements;