import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext'; // Import ThemeContext

const GoalForm = ({ onGoalAdded }) => {
    const [goal, setGoal] = useState({
        title: '',
        targetAmount: '',
        deadline: '',
    });
    const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Access dark mode state and toggle function

    const onChange = (e) => setGoal({ ...goal, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://fintrackr-backend-no1g.onrender.com/api/goals', goal, {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            toast.success('Goal created successfully!');
            setGoal({ title: '', targetAmount: '', deadline: '' });
            onGoalAdded(); // Call the function passed from the parent to refresh the list
        } catch (err) {
            toast.error('Error creating goal');
        }
    };

    return (
        <div className={`max-w-md flex mx-auto flex-col items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-md overflow-hidden md:min-w-2xl p-6 my-8`}>
            {/* <div className="flex justify-end w-full">
                <button
                    onClick={toggleDarkMode}
                    className={`mb-4 p-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div> */}
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Set Your New Goal
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Goal Title"
                    value={goal.title}
                    onChange={onChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300'}`}
                    required
                />
                <input
                    type="number"
                    name="targetAmount"
                    placeholder="Target Amount"
                    value={goal.targetAmount}
                    onChange={onChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300'}`}
                    required
                />
                <input
                    type="date"
                    name="deadline"
                    placeholder="Deadline"
                    value={goal.deadline}
                    onChange={onChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300'}`}
                    required
                />
                <button
                    type="submit"
                    className={`w-full py-3 rounded-md ${darkMode ? 'bg-sky-700 hover:bg-sky-600' : 'bg-sky-900 hover:bg-blue-600'} text-white transition-colors`}
                >
                    Save Goal
                </button>
            </form>
            <ToastContainer />
            <div className="text-center mt-6">
                <Link
                    to="/goalslist"
                    className={`inline-block font-semibold ${darkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-500 hover:text-blue-700'}`}
                >
                    View Your Goals
                </Link>
            </div>
        </div>
    );
};

export default GoalForm;
