import React, { useEffect, useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ExpenseChart = () => {
    const { userId } = useContext(AuthContext);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
                const expenses = response.data;

                if (!expenses || !Array.isArray(expenses)) {
                    console.error('Invalid data format:', expenses);
                    return;
                }

                const categories = [...new Set(expenses.map(expense => expense.category))];
                const amounts = categories.map(category => {
                    return expenses
                        .filter(expense => expense.category === category)
                        .reduce((sum, expense) => sum + expense.amount, 0);
                });

                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            label: 'Amount Spent',
                            data: amounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, [userId]);

    return (
        <div className='p-20'>
            <div className="container mx-auto px-4 py-9 min-h-screen bg-gray-100">
                <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
                <div className="chart-container">
                    <div className='relative w-full h-[400px] mb-[50px]'>
                        {chartData ? (
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            type: 'category',
                                            title: {
                                                display: true,
                                                text: 'Category',
                                            },
                                        },
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Amount',
                                            },
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p>Loading chart data...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseChart;
