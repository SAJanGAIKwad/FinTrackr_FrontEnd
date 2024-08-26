import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import {ThemeProvider} from './context/ThemeContext';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Transaction from './components/Transaction';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExpenseDetails from './pages/ExpenseDetails';
import ExpenseChart from './components/Expense/ExpenseChart';
import GoalPage from './pages/GoalPage';
import GoalList from './components/Goal/GoalList';
import Profile from './components/User/Profile';
import AchievedGoals from './components/Goal/AchievedGoals';

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
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/transactions" element={<Transaction />} />
            <Route exact path="/expensedetails" element={<ExpenseDetails />} />
            <Route exact path="/expensechart" element={<ExpenseChart userId={userId} />} />
            <Route exact path="/goals" element={<GoalPage />} />
            <Route exact path="goalslist" element={<GoalList />} />
            <Route exact path="achievedgoals" element={<AchievedGoals />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
