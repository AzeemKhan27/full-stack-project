// import React from 'react';

// const ContactInformation = () => {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto text-center">
//         <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
//         <p className="text-gray-600 mb-4">Email: contact@techassetshub.com</p>
//         <p className="text-gray-600 mb-4">Phone: 9897888956,6376367135</p>
//         <p className="text-gray-600">Address-1: Nagavara,Near Manyata Tech Park, Bangaluru, India</p>
//         <p className="text-gray-600">Address-2: Jaipur,Rajasthan, India</p>
//         <p className="text-gray-600">Address-3: Noida,Sector 16, Uttar Pradesh, India</p>
//         <p className="text-gray-600">Address-4: Mathura, Uttar Pradesh, India</p>
//         <p className="text-gray-600">Address-5: B 59/1 khanpur, New Delhi 110062.</p>
//       </div>
//     </section>
//   );
// };

// export default ContactInformation;

import React from 'react';

const ContactInformation = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Contact Information</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg text-gray-700">
          <p className="mb-4"><strong>Email:</strong> techassetshub@gmail.com </p>
          <p className="mb-4"><strong>Phone:</strong> 9897888956, 6376367135</p>
          <p className="mb-2"><strong>Address 1:</strong> Nagavara, Near Manyata Tech Park, Bangaluru, India</p>
          <p className="mb-2"><strong>Address 2:</strong> Jaipur, Rajasthan, India</p>
          <p className="mb-2"><strong>Address 3:</strong> Noida, Sector 16, Uttar Pradesh, India</p>
          <p className="mb-2"><strong>Address 4:</strong> Mathura, Uttar Pradesh, India</p>
          <p><strong>Address 5:</strong> B 59/1 Khanpur, New Delhi 110062.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
