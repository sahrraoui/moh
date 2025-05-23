import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Hotelcardrow from './HotelCardRow';
import CarCardRow from './CarCardRow';
import RentalCardRow from './RentalCardRow';
import cama from '/public/vv.jpg'

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F5F5] py-8">
        {/* Hotels Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Hotels</h2>
            <button 
              onClick={() => navigate('/hotels')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Hotels →
            </button>
          </div>
          <Hotelcardrow />
        </div>

        {/* Cars Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Cars</h2>
            <button 
              onClick={() => navigate('/cars')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Cars →
            </button>
          </div>
          <CarCardRow />
        </div>

        {/* Rentals Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-2xl font-bold">Featured Rentals</h2>
            <button 
              onClick={() => navigate('/rentals')}
              className="text-[#FF385C] hover:underline font-medium"
            >
              View All Rentals →
            </button>
          </div>
          <RentalCardRow />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">TravelEase</h2>
            <p className="text-gray-600 text-sm">Your trusted travel company across Algeria</p>
          </div>
          
          <div className="flex flex-col items-end">
            <h3 className="font-medium text-gray-800 mb-2">Assistance</h3>
            <ul className="text-right">
              <li className="text-gray-600 text-sm mb-1">Helpdesk</li>
              <li className="text-gray-600 text-sm mb-1">Support team</li>
              <li className="text-gray-600 text-sm">User manual</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;

