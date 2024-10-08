// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';  // Import ThemeContext

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);  // Access ThemeContext
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const user = { email, password };
    try {
      const res = await axios.post('https://fintrackr-backend-no1g.onrender.com/api/auth/login', user);
      if (res && res.data && res.data.token) {
        const { token } = res.data;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        localStorage.setItem('userId', decoded.user.id);
        toast.success('Login successful!');
        login(token); // Update context state
        setTimeout(() => {
          navigate('/transactions');
        }, 2000);
      } else {
        toast.error('Login failed: No token received');
        console.error('Login failed: No token received', res);
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed!');
      console.error('Login error:', err.response?.data);
    }
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen pt-10 px-4 md:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={onSubmit} className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${darkMode ? 'bg-gray-700 text-white' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${darkMode ? 'bg-gray-700 text-white' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </form>
      <p className="mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
