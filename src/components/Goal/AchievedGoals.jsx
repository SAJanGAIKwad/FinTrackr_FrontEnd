import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AchievedGoals = () => {
    const { userId } = useContext(AuthContext);
    const [achievedGoals, setAchievedGoals] = useState([]);

    useEffect(() => {
        const fetchAchievedGoals = async () => {
            try {
                const res = await axios.get('http://192.168.172.94:5000/api/goals/achieved', {
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                setAchievedGoals(res.data);
            } catch (err) {
                console.error('Error fetching achieved goals:', err);
            }
        };

        fetchAchievedGoals();
    }, [userId]);

    return (
        <div className="pt-16 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Achieved Goals</h2>
                {achievedGoals.length > 0 ? (
                    achievedGoals.map((goal) => (
                        <div key={goal._id} className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-semibold text-green-700 mb-4">{goal.title}</h3>
                            <div className="text-gray-700">
                                <p className="mb-2">
                                    <span className="font-medium">Target Amount:</span> ${goal.targetAmount.toLocaleString()}
                                </p>
                                <p className="mb-2">
                                    <span className="font-medium">Achieved Amount:</span> ${goal.currentAmount.toLocaleString()}
                                </p>
                                <p className="mb-2">
                                    <span className="font-medium">Created At:</span> {new Date(goal.createdAt).toLocaleDateString()}
                                </p>
                                <p className="mb-4">
                                    <span className="font-medium">Deadline:</span> {new Date(goal.deadline).toLocaleDateString()}
                                </p>
                                <p className="text-green-600 font-bold">Goal Achieved!</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No goals achieved yet. Keep going!</p>
                )}
            </div>
        </div>
    );
};

export default AchievedGoals;
