// src/components/Services.js

import React from 'react';

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive and high-quality websites tailored to your needs.',
    icon: '🌐',
  },
  {
    title: 'Graphic Design',
    description: 'Creating stunning visuals and graphics for your brand.',
    icon: '🎨',
  },
  {
    title: 'Content Writing',
    description: 'Crafting engaging and SEO-friendly content for your audience.',
    icon: '✍️',
  },
  {
    title: 'Digital Marketing',
    description: 'Helping you reach your target audience through effective marketing strategies.',
    icon: '📈',
  },
  {
    title: 'Help College Students',
    description: 'Assisting college students in building their projects and enhancing their skills.',
    icon: '🎓',
  },
  {
    title: 'SEO Services',
    description: 'Optimizing your website to improve visibility and ranking on search engines.',
    icon: '🔍',
  },
  {
    title: 'App Development',
    description: 'Creating user-friendly mobile applications for various platforms.',
    icon: '📱',
  },
  {
    title: 'Consultancy',
    description: 'Providing expert advice to help you navigate your projects and career.',
    icon: '💼',
  },
  {
    title: 'Career Guidance',
    description: 'Offering insights and advice to help you choose the right career path.',
    icon: '🧭',
  },
  {
    title: 'Teaching Assistance',
    description: 'Supporting educators and students in the learning process.',
    icon: '📚',
  },
  {
    title: 'Mentorship',
    description: 'Connecting you with experienced professionals for guidance and support.',
    icon: '🤝',
  },
  {
    title: 'Training',
    description: 'Providing training sessions to enhance your skills and knowledge.',
    icon: '🏆',
  },
  {
    title: 'Networking',
    description: 'Facilitating connections with industry professionals and peers.',
    icon: '🌐',
  },
  {
    title: 'Devops',
    description: '',
    icon: '🌐',
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-white-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <p className="text-gray-600 mb-12">
          We offer a range of services to help you succeed in your freelance journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                index % 2 === 0 ? 'animate-up' : ''
              }`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;