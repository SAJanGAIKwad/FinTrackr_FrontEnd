import React, { useState } from 'react';
import axios from 'axios';

const ExpensePrediction = () => {
  const [form, setForm] = useState({ date: '', category: '', description: '', currency: '' });
  const [predictedAmount, setPredictedAmount] = useState(null);

  const predictExpense = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/predict', form, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPredictedAmount(response.data.predictedAmount);
    } catch (error) {
      console.error('Error predicting expense:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Predict Your Expense</h2>
        
        <div className="space-y-4">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Currency"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={predictExpense}
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          Predict Expense
        </button>

        {predictedAmount !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800">Predicted Amount:</h3>
            <p className="text-2xl text-blue-500 font-bold mt-2">${predictedAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensePrediction;
