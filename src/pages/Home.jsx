// src/components/Home.js
import React from 'react';
import Back from '../back.jpg'
import { Link } from 'react-router-dom';
const Home = () => {
  const backgroundImageUrl = Back; // Replace with your image URL

  return (
    <div className='min-h-screen pt-10'>
      <div
        className="flex flex-col items-center justify-center h-screen px-4 text-center bg-cover bg-center md:px-8"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-white bg-opacity-75 p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-4 md:text-6xl">Welcome to the Personal FinTrackr</h1>
          <p className="text-lg text-gray-700 md:text-xl mb-6">Track your expenses and manage your finances efficiently.</p>
          <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
