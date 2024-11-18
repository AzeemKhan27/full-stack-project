import React from 'react';

const ContactInformation = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
        <p className="text-gray-600 mb-4">Email: contact@pickassets.com</p>
        < p className="text-gray-600 mb-4">Phone: (123) 456-7890</p>
        <p className="text-gray-600">Address: 123 Freelance St, Suite 100, City, Country</p>
      </div>
    </section>
  );
};

export default ContactInformation;