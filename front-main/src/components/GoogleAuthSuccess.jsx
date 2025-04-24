import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleAuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleAuthSuccess = () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const googleData = params.get('googleData');

      if (token && googleData) {
        try {
          // Store the token
          localStorage.setItem('token', token);
          
          // Parse and store user data
          const parsedUserData = JSON.parse(decodeURIComponent(googleData));
          localStorage.setItem('user', JSON.stringify(parsedUserData));
          
          // Clear the URL parameters
          window.history.replaceState({}, document.title, '/');
          
          // Navigate to home page
          navigate('/', { replace: true });
        } catch (error) {
          console.error('Error processing Google authentication:', error);
          navigate('/login', { replace: true });
        }
      } else {
        // If no auth data, redirect to login
        navigate('/login', { replace: true });
      }
    };

    handleGoogleAuthSuccess();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess; 