import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [form, setForm] = useState({ amount: '', category: '', description: '' });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [userId]);

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
    setForm({
      amount: expense.amount,
      category: expense.category,
      description: expense.description
    });
  };

  const updateExpense = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/expenses/${editingExpense._id}`, form, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setExpenses(expenses.map(expense => expense._id === editingExpense._id ? response.data : expense));
      setEditingExpense(null);
      setForm({ amount: '', category: '', description: '' });
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Expense List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Amount</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Category</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No expenses found.</td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense._id}>
                  <td className="py-2 px-4 border-b border-gray-200">{expense.amount}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{expense.category}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{expense.description}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                      onClick={() => deleteExpense(expense._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                      onClick={() => editExpense(expense)}
                    >
                      Modify
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingExpense && (
        <div className="mt-4">
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
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
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
          <button
            className="bg-green-500 text-white py-1 px-4 rounded"
            onClick={updateExpense}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
