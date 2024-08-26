import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import  {ThemeContext}  from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-sky-900 text-white'} py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">About Finance Tracker</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-300'} mt-2 max-w-md`}>
              Finance Tracker is a comprehensive tool designed to help you manage your personal finances efficiently. Track your income, expenses, and budget to achieve your financial goals with ease.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="/privacy" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                Privacy Policy
              </a>
              <a href="/terms" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                Terms of Service
              </a>
              <a href="/contact" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                Contact Us
              </a>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0 md:ml-4">
              <a href="https://www.facebook.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                <FaFacebookF />
              </a>
              <a href="https://www.twitter.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'}`}>
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-300'} text-center mt-4`}>
          &copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
