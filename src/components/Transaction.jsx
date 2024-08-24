import React, { useState, useEffect } from 'react';
import AddExpense from './Expense/AddExpense';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Transaction = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login'); // Redirect to login if user ID is not found
    }
  }, [navigate]);

  return (
    <div className="container mx-auto pt-10 min-h-screen flex flex-col items-center justify-center ">
      <h2 className="text-2xl font-bold mb-4">Transaction</h2>
      {userId ? (
        <>
          <div className="mb-4 w-full max-w-md">
            <AddExpense userId={userId} onAdd={(expense) => console.log('Expense added:', expense)} />
          </div>
          <div className="mt-4">
            <Link to="/expensedetails" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
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
