import React, { useState, useContext, useRef,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaMoneyCheckAlt, FaBullseye, FaUser, FaUserCircle, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import logo from '../logo.png';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMenu();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-900 dark:bg-gray-800 p-4 flex flex-wrap justify-between items-center z-50">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img src={logo} alt="Finance Tracker Logo" className="rounded h-8 mr-2" />
          <h1 className="text-white dark:text-yellow-400 text-2xl font-bold">FinTrackr</h1>
        </Link>
        <button className="text-white md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? '' : 'hidden'}`}>
        <ul className="md:flex md:space-x-6 text-center md:text-left w-full md:w-auto">
          <li className="my-2 md:my-0 flex justify-center">
            <Link to="/" className="text-white dark:text-yellow-400 flex items-center text-lg md:text-base py-2" onClick={closeMenu}>
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="my-2 md:my-0 flex justify-center">
                <Link to="/transactions" className="text-white dark:text-yellow-400 flex items-center text-lg md:text-base py-2" onClick={closeMenu}>
                  <FaMoneyCheckAlt className="mr-2" /> Transactions
                </Link>
              </li>
              <li className="my-2 md:my-0 flex justify-center">
                <Link to="/goals" className="text-white dark:text-yellow-400 flex items-center text-lg md:text-base py-2" onClick={closeMenu}>
                  <FaBullseye className="mr-2" /> Goals
                </Link>
              </li>
              <li className="relative my-2 md:my-0 flex justify-center" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="text-white dark:text-yellow-400 flex items-center text-lg md:text-base py-2">
                  <FaUser className="mr-2" /> Profile
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                      onClick={() => {
                        setDropdownOpen(false);
                        closeMenu();
                      }}
                    >
                      <FaUserCircle className="mr-2" /> View Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <li className="my-2 md:my-0 flex justify-center">
              <Link to="/register" className="text-white dark:text-yellow-400 flex items-center text-lg md:text-base py-2" onClick={closeMenu}>
                <FaUserPlus className="mr-2" /> Register
              </Link>
            </li>
          )}
          <li className="my-2 md:my-0 flex justify-center">
            <button onClick={toggleDarkMode} className="text-white dark:text-yellow-400 flex items-center text-lg md:text-base py-2">
              {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />} {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
