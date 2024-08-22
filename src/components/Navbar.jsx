// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaSignInAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import logo from '../logo.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-900 p-4 flex flex-wrap justify-between items-center z-50">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Finance Tracker Logo" className="rounded h-8 mr-2" />
          <h1 className="text-white text-2xl font-bold">FinTrackr</h1>
        </Link>
        <button className="text-white md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? '' : 'hidden'}`}>
        <ul className="md:flex md:space-x-6">
          <li>
            <Link to="/" className="text-white flex items-center">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/transactions" className="text-white flex items-center">
                  <FaMoneyCheckAlt className="mr-2" /> Transactions
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white flex items-center">
                  <FaSignInAlt className="mr-2" /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/register" className="text-white flex items-center">
                <FaUserPlus className="mr-2" /> Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
