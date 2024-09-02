import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import GoalForm from '../components/Goal/GoalForm';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const GoalsPage = () => {
    const { darkMode } = useContext(ThemeContext); // Access dark mode state

    const fetchGoals = async () => {
        try {
            const res = await axios.get('https://fintrackr-backend-no1g.onrender.com/api/goals', {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            // setGoals(res.data);
        } catch (err) {
            console.error('Error fetching goals:', err);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleGoalAdded = () => {
        fetchGoals(); // Re-fetch goals when a new goal is added
    };

    return (
        <div className={`container mx-auto pt-16 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <GoalForm onGoalAdded={handleGoalAdded} />
        </div>
    );
};

export default GoalsPage;
