import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUserPlus,
  FaMoneyCheckAlt,
  FaBullseye,
  FaUser,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
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
  const navbarRef = useRef(null);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, [setDarkMode]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMenu();
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navbarRef} className="fixed top-0 left-0 w-full bg-sky-900 dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center">
              <img
                src={logo}
                alt="Finance Tracker Logo"
                className="h-8 w-8 mr-2 rounded"
              />
              <span className="text-xl font-bold text-white dark:text-yellow-400">
                FinTrackr
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <FaHome className="mr-1" />
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/transactions"
                  onClick={closeMenu}
                  className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <FaMoneyCheckAlt className="mr-1" />
                  Transactions
                </Link>
                <Link
                  to="/goals"
                  onClick={closeMenu}
                  className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <FaBullseye className="mr-1" />
                  Goals
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    <FaUser className="mr-1" />
                    Profile
                    <svg
                      className="ml-1 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        <FaUserCircle className="mr-2 inline" />
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        <FaSignOutAlt className="mr-2 inline" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaUserPlus className="mr-1" />
                Register
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className={`relative flex items-center justify-between w-16 h-8 rounded-full bg-gray-300 dark:bg-gray-700 p-1 transition duration-500 ${darkMode ? 'justify-end' : 'justify-start'}`}
            >
              <span
                className={`absolute flex items-center justify-center left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 transform transition-transform duration-500 ${darkMode ? 'translate-x-8' : 'translate-x-0'}`}
              >
                {darkMode ? (
                  <FaMoon className="w-4 h-4 text-gray-700 dark:text-yellow-400" />
                ) : (
                  <FaSun className="w-4 h-4 text-yellow-400" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaHome className="mr-2" />
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/transactions"
                  onClick={closeMenu}
                  className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <FaMoneyCheckAlt className="mr-2" />
                  Transactions
                </Link>
                <Link
                  to="/goals"
                  onClick={closeMenu}
                  className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <FaBullseye className="mr-2" />
                  Goals
                </Link>
                <div className="border-t border-gray-700"></div>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <FaUserCircle className="mr-2" />
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className={`relative flex items-center justify-between w-16 h-8 rounded-full bg-gray-300 dark:bg-gray-700 p-1 transition duration-500 ${darkMode ? 'justify-end' : 'justify-start'}`}
            >
              <span
                className={`absolute flex items-center justify-center left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 transform transition-transform duration-500 ${darkMode ? 'translate-x-8' : 'translate-x-0'}`}
              >
                {darkMode ? (
                  <FaMoon className="w-4 h-4 text-gray-700 dark:text-yellow-400" />
                ) : (
                  <FaSun className="w-4 h-4 text-yellow-400" />
                )}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
