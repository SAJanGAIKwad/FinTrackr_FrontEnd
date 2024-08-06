// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Transaction from './components/Transaction';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExpenseDeatils from './pages/ExpenseDetails';
import ExpenseChart from './components/ExpenseChart';

const App = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('User ID not found');
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/expensedetails" element={<ExpenseDeatils />} />
          <Route path="/expensechart" element={<ExpenseChart userId={userId} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
