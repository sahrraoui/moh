import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleAuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleAuth = () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const userData = params.get('userData');

      if (token && userData) {
        try {
          // Store the token
          localStorage.setItem('token', token);
          
          // Parse and store user data
          const parsedUserData = JSON.parse(decodeURIComponent(userData));
          localStorage.setItem('user', JSON.stringify(parsedUserData));
          
          // Clear the URL parameters and navigate to home
          window.history.replaceState({}, document.title, '/');
          navigate('/');
        } catch (error) {
          console.error('Error processing Google authentication:', error);
        }
      }
    };

    handleGoogleAuth();
  }, [location, navigate]);

  return null; // This component doesn't render anything
};

export default GoogleAuthHandler; 