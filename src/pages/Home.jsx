import React from 'react';
import Back from '../back.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  const backgroundImageUrl = Back;

  return (
    <div className='min-h-screen'>
      <div
        className="flex flex-col items-center justify-center h-screen px-4 text-center bg-cover bg-center relative md:px-8"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 md:text-5xl leading-tight">
            Welcome to <span className="text-blue-600">Personal FinTrackr</span>
          </h1>
          <p className="text-lg text-gray-700 md:text-xl mb-6 leading-relaxed">
            Track your expenses and manage your finances efficiently.
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white opacity-0 transition duration-300 ease-in-out transform scale-110 hover:opacity-5"></span>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
