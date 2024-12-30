// my-portfolio\client\src\components\sections\AboutPage\CallToAction.jsx

import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">Join us today and take your freelance journey to the next level!</p>
        <a href="/join-our-team" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-200">
          Join our team
        </a>
      </div>
    </section>
  );
};

export default CallToAction;