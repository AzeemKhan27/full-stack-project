
// import React from 'react';
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white p-8">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <p className="text-lg font-semibold">&copy; 2024 Tech Assets Hub. All rights reserved.</p>
//         </div>
//         <div className="flex space-x-4">
//           {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
//             <FaFacebook size={24} />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
//             <FaTwitter size={24} />
//           </a>
//           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
//             <FaLinkedin size={24} />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition duration-300">
//             <FaInstagram size={24} />
//           </a> */}
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-100 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Text */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold">
            &copy; 2024 Tech Assets Hub. All rights reserved.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-purple-400 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-purple-400 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-purple-400 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-purple-400 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
