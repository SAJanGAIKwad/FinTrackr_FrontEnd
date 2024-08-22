import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { user: { id } } = jwtDecode(token);
        setIsLoggedIn(true);
        setUserId(id);
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Clear any invalid token
      }
    }
  }, []);

  const login = (token) => {
    try {
      const { user: { id } } = jwtDecode(token);
      setIsLoggedIn(true);
      setUserId(id);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
