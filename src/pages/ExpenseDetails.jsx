import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import { Link } from 'react-router-dom';

const ExpenseDeatils = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Handle case when user ID is not found, e.g., redirect to login
      console.error('User ID not found');
    }
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen">
      <h2 className="text-2xl font-bold mb-4">Transaction</h2>
      {userId ? (
        <div className='p-5'>
          <Link to="/ExpenseChart" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300 ease-in-out transform hover:scale-105">View Chart</Link>
          <ExpenseList userId={userId} />
        </div>
      ) : (
        <p>Loading...</p> // Optionally show a loading indicator or redirect to login
      )}
    </div>
  );
};

export default ExpenseDeatils;
