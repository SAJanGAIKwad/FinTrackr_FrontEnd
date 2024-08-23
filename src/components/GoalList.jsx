import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const GoalList = () => {
    const { userId } = useContext(AuthContext);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/goals`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                setGoals(res.data);
            } catch (err) {
                console.error('Error fetching goals:', err);
            }
        };

        fetchGoals();
    }, [userId]);

    return (
        <div className="pt-16 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Goals</h2>
                {goals.length > 0 ? (
                    goals.map((goal) => (
                        <div key={goal._id} className="mb-8 p-6 bg-violet-50 border border-violet-200 rounded-lg shadow-sm">
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
                                    <div className="overflow-hidden h-4 text-xs flex rounded bg-violet-200">
                                        <div
                                            style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-violet-500"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No goals found. Start by setting a new goal!</p>
                )}
            </div>
        </div>
    );
};

export default GoalList;
