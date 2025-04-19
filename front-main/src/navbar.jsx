import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useCallback } from 'react';
import Login from './login';
import SignUp from './signup';
import Hotelcardrow from './HotelCardRow';
function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <nav className="shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-black text-lg font-bold">TravelEase</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-8">
                <button className="text-black px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 hover:text-xl transition-all duration-300">
                  Hotels
                </button>
                <button className="text-black px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 hover:text-xl transition-all duration-300">
                  Cars
                </button>
                <button className="text-black px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 hover:text-xl transition-all duration-300">
                  Rental
                </button>
              </div>
            </div>
            <div className="flex items-center">
              {!user ? (
                <div className="hidden sm:flex items-center space-x-4">
                  <button className="bg-white text-[#E61E51] px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-300 border border-[#E61E51]">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="bg-[#E61E51] text-white px-3 py-1 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                    <Link to="/signup">Sign up</Link>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">{user.firstName}</span>
                  <button 
                    onClick={handleLogout} 
                    className="bg-[#E61E51] text-white px-3 py-1 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
              <div className="sm:hidden flex items-center space-x-2 mr-2">
                {!user ? (
                  <>
                    <button className="bg-white text-[#E61E51] px-3 py-1 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-300 border border-[#E61E51]">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="bg-[#E61E51] text-white px-3 py-1 rounded-md text-base font-medium hover:bg-rose-800 transition-colors duration-300">
                      <Link to="/signup">Sign up</Link>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLogout} 
                    className="bg-[#E61E51] text-white px-3 py-1 rounded-md text-base font-medium hover:bg-rose-800 transition-colors duration-300"
                  >
                    Logout
                  </button>
                )}
                <button
                  type="button"
                  className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-black hover:text-gray-700 focus:outline-none transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    className={!isMobileMenuOpen ? 'block h-6 w-6' : 'hidden'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg
                    className={isMobileMenuOpen ? 'block h-6 w-6' : 'hidden'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden bg-[#E61E51]">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <button className="w-full bg-[#E61E51] text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                Hotels
              </button>
              <button className="w-full bg-[#E61E51] text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                Cars
              </button>
              <button className="w-full bg-[#E61E51] text-white px-4 py-3 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                Rental
              </button>
            </div>
          </div>
        )}
      </nav>
      <Hotelcardrow/>
    </>
  );
}

export default Navbar;