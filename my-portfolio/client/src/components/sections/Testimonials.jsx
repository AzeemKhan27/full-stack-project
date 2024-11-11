// src/components/Testimonials.js

import React from 'react';
import './css/Testimonials.css'; // Import the CSS file for styles


const testimonials = [
  {
    name: 'Ashwini',
    feedback: 'The web development service was outstanding! My website looks amazing and functions perfectly.',
    designation: 'MCA Student, Jain University(Bangaluru)',
    avatar: '👤', // You can replace this with an actual image URL
  },
  {
    name: 'Shreenath Mateti',
    feedback: 'It was an amazing experience with your tech Team and they all experience personalities hand holding me to build my final semester project',
    designation: 'B-Tech Student, Amity University',
    avatar: '👤', // You can replace this with an actual image URL
  },
  {
    name: 'Manisha Verma',
    feedback: 'You all are very professionals and humble personalities. Thank you for delivering me such helpful guidance and path. Before the session, I was literally very confused about where to go and kick start my career.',
    designation: 'Junior Web Developer at IT startup, Noida',
    avatar: '👤', // You can replace this with an actual image URL
  },
  {
    name: 'John Ponnapureddy',
    feedback: 'The digital marketing strategies implemented have significantly increased my traffic.',
    designation: 'Business Owner',
    avatar: '👤', // You can replace this with an actual image URL
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-cyan-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
        <p className="text-gray-600 mb-12">
          Hear from our satisfied clients about their experiences with our services.
        </p>
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-scroll">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="inline-block bg-white p-6 rounded-lg shadow-lg mx-4">
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
                <p className="text-gray-700 italic mb-2">"{testimonial.feedback}"</p>
                <p className="text-gray-500">{testimonial.designation}</p>
              </div>
            ))}
            {/* Duplicate testimonials for continuous scrolling effect */}
            {testimonials.map((testimonial, index) => (
              <div key={`duplicate-${index}`} className="inline-block bg-white p-6 rounded-lg shadow-lg mx-4">
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
                <p className="text-gray-700 italic mb-2">"{testimonial.feedback}"</p>
                <p className="text-gray-500">{testimonial.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;