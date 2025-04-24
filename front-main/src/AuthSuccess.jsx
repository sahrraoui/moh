import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const googleData = params.get('googleData');

    if (token && googleData) {
      try {
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', googleData);
        
        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Error processing authentication:', error);
        navigate('/login', { state: { error: 'Authentication failed' } });
      }
    } else {
      // If no token or user data, redirect to login with error
      navigate('/login', { state: { error: 'Authentication failed' } });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Processing authentication...</h2>
        <p className="text-gray-600">Please wait while we complete your sign in.</p>
      </div>
    </div>
  );
}

export default AuthSuccess; 