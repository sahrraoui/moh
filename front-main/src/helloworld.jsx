import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

function HelloWorld() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white pt-16">
        <div className="w-[600px] bg-[#e9dfdf] rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-rose-500">Welcome to Travlease</h1>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="h-20 w-20 rounded-full bg-rose-500 mx-auto flex items-center justify-center text-white text-4xl font-bold">
                {user.firstName.charAt(0)}
              </div>
              <h2 className="text-2xl font-semibold mt-4">Hello, {user.firstName}!</h2>
              <p className="text-gray-600 mt-2">We're glad to have you here</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="font-semibold text-rose-700">Your Profile</h3>
                <p className="text-sm text-gray-600 mt-1">View and edit your profile details</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="font-semibold text-rose-700">Bookings</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your current bookings</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="font-semibold text-rose-700">Explore</h3>
                <p className="text-sm text-gray-600 mt-1">Discover new destinations</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="font-semibold text-rose-700">Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your account settings</p>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/')} 
              className="w-full bg-rose-500 text-white py-2 rounded-md font-semibold hover:bg-rose-600 transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelloWorld;
