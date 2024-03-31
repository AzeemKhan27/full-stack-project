import React from 'react';
import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
          <p className="text-lg mb-4">We'd love to hear from you! Feel free to contact us using the form below.</p>
          <p className="text-gray-600">123 Main Street<br />New York, NY 10001<br />United States</p>
          <p className="text-gray-600 mt-2">Email: info@example.com<br />Phone: +1 123-456-7890</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;

