import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-sky-900 text-white'} py-6`}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a 
            href="https://www.facebook.com" 
            className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-500"
          >
            <FaFacebookF size={20} />
          </a>
          <a 
            href="https://www.linkedin.com" 
            className="bg-blue-700 p-3 rounded-full text-white hover:bg-blue-600"
          >
            <FaLinkedin size={20} />
          </a>
          <a 
            href="https://www.twitter.com" 
            className="bg-sky-500 p-3 rounded-full text-white hover:bg-sky-400"
          >
            <FaTwitter size={20} />
          </a>
          <a 
            href="https://www.youtube.com" 
            className="bg-red-600 p-3 rounded-full text-white hover:bg-red-500"
          >
            <FaYoutube size={20} />
          </a>
          <a 
            href="https://www.instagram.com" 
            className="bg-pink-500 p-3 rounded-full text-white hover:bg-pink-400"
          >
            <FaInstagram size={20} />
          </a>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="/careers" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-white hover:text-gray-400'}`}>
            Careers
          </a>
          <a href="/privacy" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-white hover:text-gray-400'}`}>
            Privacy Statement
          </a>
          <a href="/terms" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-white hover:text-gray-400'}`}>
            Terms of Use
          </a>
        </div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center text-sm`}>
          By using this site you agree that we can place cookies on your device. See <a href="/privacy" className="underline">Privacy Statement</a> for details.
        </div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center mt-4`}>
          &copy; {new Date().getFullYear()} Finance Tracker. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
