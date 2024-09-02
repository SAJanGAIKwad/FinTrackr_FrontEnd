import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [form, setForm] = useState({ amount: '', category: '', description: '', currency: '' });

  const exportToCSV = async () => {
    try {
      const response = await axios.get(`https://fintrackr-backend-no1g.onrender.com/api/expenses/${userId}/export/csv`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  };

  const exportToPDF = async () => {
    try {
      const response = await axios.get(`https://fintrackr-backend-no1g.onrender.com/api/expenses/${userId}/export/pdf`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`https://fintrackr-backend-no1g.onrender.com/api/expenses/${userId}`);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [userId]);

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`https://fintrackr-backend-no1g.onrender.com/api/expenses/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
    setForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      currency: expense.currency,
    });
  };

  const updateExpense = async () => {
    try {
      const response = await axios.put(`https://fintrackr-backend-no1g.onrender.com/api/expenses/${editingExpense._id}`, form, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setExpenses(expenses.map((expense) => (expense._id === editingExpense._id ? response.data : expense)));
      setEditingExpense(null);
      setForm({ amount: '', category: '', description: '', currency: '' });
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const conversionRates = {
    INR: 0.012, // Example: 1 INR = 0.012 USD
    USD: 1,     // USD to USD conversion rate is 1
    EUR: 1.08,  // Example: 1 EUR = 1.08 USD
    GBP: 1.27,  // Conversion rate from GBP to USD
    JPY: 0.0070
  };

  const totalExpense = expenses
    .reduce((total, expense) => {
      const rate = conversionRates[expense.currency] || 1;
      return total + expense.amount * rate;
    }, 0)
    .toFixed(2);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto pb-4 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Amount (In USD)</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Category</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Description</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Currency</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-200 text-center">{expense.amount}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">{expense.category}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">{expense.description}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">{expense.currency}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-center">
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                          onClick={() => deleteExpense(expense._id)}
                        >
                          <i className="fas fa-trash-alt"></i> Delete
                        </button>
                        <button
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition"
                          onClick={() => editExpense(expense)}
                        >
                          <i className="fas fa-edit"></i> Modify
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 transition"
              onClick={exportToCSV}
            >
              <i className="fas fa-file-csv"></i> Export as CSV
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition"
              onClick={exportToPDF}
            >
              <i className="fas fa-file-pdf"></i> Export as PDF
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white m-4 p-6 rounded-lg  shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Expense</h3>
          <p className="text-2xl font-bold text-sky-900">${totalExpense}</p>
        </div>


        {editingExpense && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setEditingExpense(null)}
          >
            <div
              className="bg-white p-6 rounded shadow-lg w-[90%] sm:w-[50%]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2">Edit Expense</h3>
              <div className="mb-2">
                <label className="block text-gray-700">Amount:</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Category:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Description:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Currency:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                >
                  <option value="">Select currency</option>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="EUR">GBP</option>
                  <option value="EUR">JPY</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                  onClick={updateExpense}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
