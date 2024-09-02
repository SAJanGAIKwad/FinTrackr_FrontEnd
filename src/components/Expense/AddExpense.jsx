import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../../context/ThemeContext';

const AddExpense = ({ userId, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');

  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];
  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY'];

  const { darkMode } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = { amount: parseFloat(amount), category, description, currency, userId };
      const response = await axios.post('https://fintrackr-backend-no1g.onrender.com/api/expenses/add', newExpense);
      onAdd(response.data);
      setAmount('');
      setCategory('');
      setDescription('');
      setCurrency('USD');
      toast.success('Expense added successfully!');
    } catch (error) {
      toast.error('Error adding expense');
      console.error('Error adding expense:', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-xl shadow-md max-w-md mx-auto ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className={`w-full p-3 border rounded-xl hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={`w-full p-3 border rounded-xl hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-3 border rounded-xl hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="currency">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            className={`w-full p-3 border rounded-xl hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'
            }`}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-md ${
            darkMode ? 'bg-sky-700 hover:bg-sky-600' : 'bg-sky-900 hover:bg-blue-600'
          } text-white transition duration-200`}
        >
          Add Expense
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddExpense;
