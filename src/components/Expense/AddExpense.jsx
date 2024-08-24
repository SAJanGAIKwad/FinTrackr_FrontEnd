import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExpense = ({ userId, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');

  const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];
  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = { amount: parseFloat(amount), category, description, currency, userId };
      const response = await axios.post('http://192.168.172.94:5000/api/expenses/add', newExpense);
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
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md mx-auto bg-gray-100">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 border rounded hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border rounded hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            className="w-full p-2 border rounded hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
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
          className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-700 focus:outline-none focus:bg-blue-600 transition duration-200"
        >
          Add Expense
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddExpense;
