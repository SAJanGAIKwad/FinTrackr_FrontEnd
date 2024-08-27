import React, { useState, useEffect, useContext } from 'react';
import AddExpense from './Expense/AddExpense';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const Transaction = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Access dark mode state and toggle function

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login'); // Redirect to login if user ID is not found
    }
  }, [navigate]);

  return (
    <div className={`container mx-auto pt-16 min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'}`}>
      <div className="flex justify-end w-full mb-4">
      </div>
      <h2 className="text-2xl font-bold mb-4 p-7">Transaction</h2>
      {userId ? (
        <>
          <div className="mb-4 w-full max-w-md">
            <AddExpense userId={userId} onAdd={(expense) => console.log('Expense added:', expense)} />
          </div>
          <div className="mt-4">
            <Link
              to="/expensedetails"
              className={`bg-sky-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ${darkMode ? 'bg-sky-700 hover:bg-sky-600' : ''}`}
            >
              <FaMoneyCheckAlt className="mr-2" />
              Show Expense List
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Transaction;
