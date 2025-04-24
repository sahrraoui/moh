import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = "" //localStorage.getItem('user');
      console.log(storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      // No longer redirecting to login if no user is found
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we prepare your experience.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {user ? `Welcome to TravelEase, ${user.firstName}!` : 'Welcome to TravelEase!'}
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Find the best hotels, cars, and rentals for your next adventure.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Luxury Hotel</h3>
                <p className="text-gray-600">Experience the ultimate comfort</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Boutique Hotel</h3>
                <p className="text-gray-600">Unique and personalized experience</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Resort</h3>
                <p className="text-gray-600">All-inclusive relaxation</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Paris</h3>
                <p className="text-gray-600">The City of Light</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Tokyo</h3>
                <p className="text-gray-600">A blend of tradition and innovation</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">New York</h3>
                <p className="text-gray-600">The city that never sleeps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home; 