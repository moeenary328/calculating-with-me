'use client';
import React from 'react';
import { FaYoutube, FaFacebookF} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center sm:flex-row sm:justify-between">
        
        {/* Left: Copyright */}
        <div className="text-sm text-gray-400 mb-4 sm:mb-0">
          © {currentYear} Calculating With Me. All rights reserved.
        </div>

        {/* Center: Privacy Links */}
        <div className="text-sm text-gray-400 mb-4 sm:mb-0">
          <div className="flex space-x-4 justify-center">
            <a href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-400 transition-colors duration-300">
              Terms & Conditions
            </a>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4 text-gray-300">
          <a href="https://youtube.com/@codebymoeen-o4j?si=dFDyt8xdCxd22TDn" className="hover:text-red-500 transition-colors duration-300">
            <FaYoutube size={24} />
          </a>
          <a href="https://www.facebook.com/share/1BbHoqUs2K/" className="hover:text-blue-600 transition-colors duration-300">
            <FaFacebookF size={24} />
          </a>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
