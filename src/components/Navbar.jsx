import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserPlus, FaMoneyCheckAlt, FaBullseye, FaUser } from 'react-icons/fa';
import logo from '../logo.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false); // Close menu on logout
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
    <nav className="fixed top-0 left-0 w-full bg-sky-900 p-4 flex flex-wrap justify-between items-center z-50">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Finance Tracker Logo" className="rounded h-8 mr-2" />
          <h1 className="text-white text-2xl font-bold">FinTrackr</h1>
        </Link>
        <button className="text-white md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      <div
        className={`w-full md:flex md:items-center md:w-auto overflow-hidden transform transition-all duration-700 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-full md:max-h-full md:opacity-100 md:translate-y-0'
        }`}
      >
        <ul className="md:flex md:space-x-6 text-center md:text-left">
          <li>
            <Link to="/" className="text-white flex items-center text-lg md:text-base py-2" onClick={() => setIsOpen(false)}>
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/transactions" className="text-white flex items-center text-lg md:text-base py-2" onClick={() => setIsOpen(false)}>
                  <FaMoneyCheckAlt className="mr-2" /> Transactions
                </Link>
              </li>
              <li>
                <Link to="/goals" className="text-white flex items-center text-lg md:text-base py-2" onClick={() => setIsOpen(false)}>
                  <FaBullseye className="mr-2" /> Goals
                </Link>
              </li>
              <li className="relative" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="text-white flex items-center text-lg md:text-base py-2">
                  <FaUser className="mr-2" /> Profile
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => {
                        setDropdownOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <li>
              <Link to="/register" className="text-white flex items-center text-lg md:text-base py-2" onClick={() => setIsOpen(false)}>
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
