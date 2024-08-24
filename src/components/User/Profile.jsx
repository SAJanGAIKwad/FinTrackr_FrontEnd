import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        if (!userId) {
            setError('User ID is not available.');
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://192.168.172.94:5000/api/users/${userId}`, {
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                setUserData(response.data);
                setFormData({ name: response.data.name, email: response.data.email });
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://192.168.172.94:5000/api/users/${userId}`, formData, {
                headers: { 'x-auth-token': localStorage.getItem('token') },
            });
            setUserData(response.data);
            setEditing(false);
        } catch (err) {
            console.error('Error updating user data:', err);
            setError('Error updating user data');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    return (
        <div className="pt-16 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
                    <FaUser className="mr-2" /> Profile
                </h2>
                {editing ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <div className="relative">
                                <FaUser className="absolute top-2.5 left-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 pl-10 block w-full border rounded focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute top-2.5 left-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 pl-10 block w-full border rounded focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                <FaSave className="mr-2" /> Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="flex items-center bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                <FaTimes className="mr-2" /> Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-gray-700">
                        <p className="mb-4 flex items-center">
                            <FaUser className="mr-2 text-gray-500" /> <span className="font-medium mx-2">Name: </span> {userData.name || 'Not available'}
                        </p>
                        <p className="mb-4 flex items-center">
                            <FaEnvelope className="mr-2 text-gray-500" /> <span className="font-medium mx-2">Email: </span> {userData.email || 'Not available'}
                        </p>
                        <p className="mb-4 flex items-center">
                            <FaCalendarAlt className="mr-2 text-gray-500" /> <span className="font-medium mx-2">Joined At: </span> {new Date(userData.createdAt).toLocaleDateString() || 'Not available'}
                        </p>
                        <button
                            onClick={() => setEditing(true)}
                            className="mt-4 flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
