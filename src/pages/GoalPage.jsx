import React, {useEffect } from 'react';
import axios from 'axios';
import GoalForm from '../components/Goal/GoalForm';

const GoalsPage = () => {
    // const [goals, setGoals] = useState([]);
    const fetchGoals = async () => {
        try {
            const res = await axios.get('http://192.168.172.94:5000/api/goals', {
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
        <div className="container mx-auto pt-16 min-h-screen">
            <GoalForm onGoalAdded={handleGoalAdded} />
        </div>
    );
};

export default GoalsPage;
