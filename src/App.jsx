import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Transaction from './components/Transaction';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExpenseDetails from './pages/ExpenseDetails';
import ExpenseChart from './components/ExpenseChart';
import ExpensePrediction from './components/ExpensePredictions';

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
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/transactions" element={<Transaction />} />
          <Route exact path="/expensedetails" element={<ExpenseDetails />} />
          <Route exact path="/expenseprediction" element={<ExpensePrediction />} />
          <Route exact path="/expensechart" element={<ExpenseChart userId={userId} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
