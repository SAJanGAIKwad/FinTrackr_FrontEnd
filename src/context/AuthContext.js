// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsLoggedIn(true);
      setUserId(decoded.user.id);
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setIsLoggedIn(true);
    setUserId(decoded.user.id);
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
