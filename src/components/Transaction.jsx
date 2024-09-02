import React, { useState, useEffect, useContext } from 'react';
import AddExpense from './Expense/AddExpense';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const Transaction = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext); // Access dark mode state

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login'); // Redirect to login if user ID is not found
    }
  }, [navigate]);

  return (
    <div
      className={`container mx-auto pt-16 min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
        }`}
    >
      <h2 className="text-3xl font-bold mb-8">Transaction</h2>
      {userId ? (
        <>
          <div className="mb-6 w-full max-w-md">
            <AddExpense userId={userId} onAdd={(expense) => console.log('Expense added:', expense)} />
          </div>
          <div className="mt-6">
            <Link
              to="/expensedetails"
              className={`flex items-center justify-center bg-sky-900 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 ${darkMode ? 'bg-sky-700 hover:bg-sky-600' : ''
                }`}
            >
              <FaMoneyCheckAlt className="mr-2" />
              Show Expense List
            </Link>
          </div>
        </>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Transaction;
