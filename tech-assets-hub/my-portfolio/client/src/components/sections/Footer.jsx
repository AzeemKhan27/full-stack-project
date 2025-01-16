// import React from 'react';
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-blue-900 text-gray-100 py-8">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
//         {/* Copyright Text */}
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <p className="text-lg font-semibold">
//             &copy; 2024 Tech Assets Hub. All rights reserved.
//           </p>
//         </div>

//         {/* Social Media Icons */}
//         <div className="flex space-x-4">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-100 hover:text-purple-400 transition duration-300"
//             aria-label="Facebook"
//           >
//             <FaFacebook size={24} />
//           </a>
//           <a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-100 hover:text-purple-400 transition duration-300"
//             aria-label="Twitter"
//           >
//             <FaTwitter size={24} />
//           </a>
//           <a
//             href="https://linkedin.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-100 hover:text-purple-400 transition duration-300"
//             aria-label="LinkedIn"
//           >
//             <FaLinkedin size={24} />
//           </a>
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-100 hover:text-purple-400 transition duration-300"
//             aria-label="Instagram"
//           >
//             <FaInstagram size={24} />
//           </a>
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
        {/* Company Info */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Tech Assets Hub</h2>
          <p className="text-sm">
            Your one-stop solution for all tech assets. We provide the latest news, reviews, and insights into the tech world.
          </p>
        </div>

        {/* Links Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-md font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-100 hover:text-purple-400 transition duration-300">About Us</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-100 hover:text-purple-400 transition duration-300">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="text-gray-100 hover:text-purple-400 transition duration-300">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="text-gray-100 hover:text-purple-400 transition duration-300">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
       

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
            <FaLinkedin size ={24} />
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