import React, { useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const GoalForm = ({ onGoalAdded }) => {
    const [goal, setGoal] = useState({
        title: '',
        targetAmount: '',
        deadline: '',
    });

    const onChange = (e) => setGoal({ ...goal, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/goals', goal, {
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
        <div className="max-w-md flex mx-auto flex-col items-center justify-center bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 my-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Set a New Goal</h2>
            <form onSubmit={onSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Goal Title"
                    value={goal.title}
                    onChange={onChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="number"
                    name="targetAmount"
                    placeholder="Target Amount"
                    value={goal.targetAmount}
                    onChange={onChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="date"
                    name="deadline"
                    placeholder="Deadline"
                    value={goal.deadline}
                    onChange={onChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Save Goal
                </button>
            </form>
            <ToastContainer />
            <div className="text-center mt-6">
                <Link
                    to="/goalslist"
                    className="inline-block text-blue-500 hover:text-blue-700 font-semibold"
                >
                    View Your Goals
                </Link>
            </div>
        </div>
    );
};

export default GoalForm;
