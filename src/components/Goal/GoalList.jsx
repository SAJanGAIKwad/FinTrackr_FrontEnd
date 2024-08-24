import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion'; // Import Framer Motion

const GoalList = () => {
    const { userId } = useContext(AuthContext);
    const [goals, setGoals] = useState([]);
    const [editGoalId, setEditGoalId] = useState(null);
    const [currentAmount, setCurrentAmount] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const res = await axios.get('http://192.168.172.94:5000/api/goals', {
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                setGoals(res.data.filter(goal => !goal.isAchieved));
            } catch (err) {
                console.error('Error fetching goals:', err);
            }
        };

        fetchGoals();
    }, [userId]);

    const handleUpdate = async (goalId) => {
        try {
            const goalToUpdate = goals.find(goal => goal._id === goalId);
            const updatedCurrentAmount = parseFloat(goalToUpdate.currentAmount) + parseFloat(currentAmount);

            const res = await axios.put(
                `http://192.168.172.94:5000/api/goals/${goalId}`,
                { currentAmount: updatedCurrentAmount },
                { headers: { 'x-auth-token': localStorage.getItem('token') } }
            );

            toast.success('Goal updated successfully!');

            if (updatedCurrentAmount >= goalToUpdate.targetAmount) {
                // Remove the achieved goal from the list
                setGoals((prevGoals) =>
                    prevGoals.filter((goal) => goal._id !== goalId)
                );
            } else {
                // Update the current amount in the goals list
                setGoals((prevGoals) =>
                    prevGoals.map((goal) =>
                        goal._id === goalId ? { ...goal, currentAmount: updatedCurrentAmount } : goal
                    )
                );
            }

            setEditGoalId(null);
            setCurrentAmount('');
        } catch (err) {
            console.error('Error updating goal:', err);
            toast.error('Error updating goal');
        }
    };

    return (
        <div className="pt-16 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-lg shadow-lg">
                <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Your Goals
                </motion.h2>

                <div className="mb-6 text-right">
                    <motion.button
                        onClick={() => navigate('/achievedgoals')}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        View Achieved Goals
                    </motion.button>
                </div>

                {goals.length > 0 ? (
                    goals.map((goal) => {
                        const percentageComplete = (goal.currentAmount / goal.targetAmount) * 100;
                        return (
                            <motion.div
                                key={goal._id}
                                className="mb-8 p-6 bg-violet-50 border border-violet-200 rounded-lg shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-violet-700 mb-4">{goal.title}</h3>
                                <div className="text-gray-700">
                                    <p className="mb-2">
                                        <span className="font-medium">Target Amount:</span> ${goal.targetAmount.toLocaleString()}
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-medium">Current Amount:</span> ${goal.currentAmount.toLocaleString()}
                                    </p>
                                    <p className="mb-2">
                                        <span className="font-medium">Created At:</span> {new Date(goal.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="mb-4">
                                        <span className="font-medium">Deadline:</span> {new Date(goal.deadline).toLocaleDateString()}
                                    </p>
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-violet-200">
                                            <div
                                                style={{ width: `${percentageComplete}%` }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400"
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 text-right">
                                            {percentageComplete.toFixed(2)}% Complete
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        {editGoalId === goal._id ? (
                                            <>
                                                <motion.input
                                                    type="number"
                                                    placeholder="Update Current Amount"
                                                    value={currentAmount}
                                                    onChange={(e) => setCurrentAmount(e.target.value)}
                                                    className="p-2 border border-gray-300 rounded-md w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    whileFocus={{ scale: 1.02 }}
                                                />
                                                <motion.button
                                                    onClick={() => handleUpdate(goal._id)}
                                                    className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-700 transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Save
                                                </motion.button>
                                            </>
                                        ) : (
                                            <motion.button
                                                onClick={() => setEditGoalId(goal._id)}
                                                className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-700 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Update
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <motion.p
                        className="text-gray-600 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No goals found. Start by setting a new goal!
                    </motion.p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default GoalList;
