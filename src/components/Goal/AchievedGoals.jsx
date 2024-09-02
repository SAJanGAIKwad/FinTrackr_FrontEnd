import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext'; 

const AchievedGoals = () => {
    const { userId } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);  
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
        <div className={`pt-16 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className={`max-w-4xl mx-auto px-6 py-8 my-8 rounded-xl shadow-lg transform transition-transform duration-300 ${darkMode ? 'bg-sky-800 hover:shadow-sky-600' : 'bg-white hover:shadow-sky-400'}`}>
                <h2 className={`text-4xl font-extrabold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Achieved Goals
                </h2>
                {achievedGoals.length > 0 ? (
                    achievedGoals.map((goal) => (
                        <div key={goal._id} className={`mb-8 p-6 border-l-4 transform hover:scale-105 transition-transform duration-200 ${darkMode ? 'bg-sky-900 border-sky-700' : 'bg-sky-50 border-sky-200'} rounded-lg shadow-sm`}>
                            <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-sky-300' : 'text-sky-700'}`}>{goal.title}</h3>
                            <div>
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
                                <p className={`font-bold text-lg ${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>Goal Achieved!</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`text-center text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No goals achieved yet. Keep going!</p>
                )}
            </div>
        </div>
    );
};

export default AchievedGoals;
