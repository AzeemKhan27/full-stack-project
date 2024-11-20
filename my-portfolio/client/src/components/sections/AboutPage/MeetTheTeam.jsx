import React from 'react';

const teamMembers = [
  {
    name: 'Shreenath',
    role: 'Software Engineer',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Ashwini S',
    role: 'Python Devoper',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Charitha',
    role: 'Digital Marketing Expert',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Apexa',
    role: 'SEO Expert and Digital Market Expert',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Ritesh',
    role: 'Fullstack Developer',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Devki Nandan Pandey',
    role: 'Lead Developer',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Hussain',
    role: 'Frontend Expert',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Zainab',
    role: 'English Spoken Helper',
    image: 'https://via.placeholder.com/150',
  },
];

const MeetTheTeam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Meet the Team</h2>
        <div className="flex flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-1/2 md:w-1/4 p-4">
              <img src={member.image} alt={member.name} className="rounded-full mb-4 w-32 h-32 mx-auto" />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;