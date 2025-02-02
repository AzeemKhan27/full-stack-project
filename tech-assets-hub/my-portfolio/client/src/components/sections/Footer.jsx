
import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6'; // Updated import for X icon

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-100 py-8">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <a href="/about"><h2 className="text-lg font-semibold">Tech Assets Hub</h2></a>
          <p className="text-sm mt-2">
            Your one-stop solution for all tech assets. We provide the latest news, reviews, and insights into the tech world.
          </p>
          <p className="text-lg font-semibold mt-4">
            &copy; 2024 Tech Assets Hub. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold">Quick Links</h3>
          <ul className="flex flex-col space-y-2 mt-2">
            
            <li>
              <a href="/about" className="text-gray-100 hover:text-purple-400 transition duration-300">About Us</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-100 hover:text-purple-400 transition duration-300">Contact</a>
            </li>
            <li>
              <a href="/services/student" className="text-gray-100 hover:text-purple-400 transition duration-300">Student Serivces</a>
            </li>
            <li>
              <a href="/services/client" className="text-gray-100 hover:text-purple-400 transition duration-300">Client Services</a>
            </li>
            <li>
              <a href="/terms-of-service" className="text-gray-100 hover:text-purple-400 transition duration-300">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-gray-100 hover:text-purple-400 transition duration-300">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-md font-semibold">Follow Us</h3>
          <div className="flex flex-row space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-purple-400 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={24} /> Facebook
            </a>
            <a
              href="https://x.com/tech_Assets_Hub?t=nX2uTdExyqqmsbF2UikQCw&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-purple-400 transition duration-300"
              aria-label="X (formerly Twitter)"
            >
              <FaX size={24} /> X
            </a>
            <a
              href="https://www.linkedin.com/in/tech-assets-hub-48758b348"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-purple-400 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} /> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/tech_assets_hub?igsh=MW9idHBpOGV4ZzZ4bQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-purple-400 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={24} /> Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
