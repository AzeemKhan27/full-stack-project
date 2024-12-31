// // Footer.jsx

// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto">
//         <p className="text-center">&copy; 2024  Tech Assets Hub. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold">&copy; 2024 Tech Assets Hub. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
            <FaInstagram size={24} />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
