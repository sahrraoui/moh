import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from './services/api';

const EmailVer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      let response;
      
      if (location.state?.forgotPassword) {
        response = await authAPI.forgotPassword(email);
      } else {
        response = await authAPI.resendActivation(email);
      }
      
      navigate('/ver-code', { 
        state: { 
          email,
          userId: response.data.userId,
          purpose: location.state?.forgotPassword ? 'password-reset' : 'account-activation'
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[400px] bg-[#e9dfdf] rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          {location.state?.forgotPassword ? 'Reset Password' : 'Email Verification'}
        </h2>

        <p className="text-gray-600 mb-4 text-center text-sm">
          {location.state?.forgotPassword 
            ? 'Enter your email address to receive a verification code to reset your password.'
            : 'Enter your email address to receive a verification code for account activation.'}
        </p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-rose-500 text-white py-2 rounded-md font-semibold hover:bg-rose-600 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-rose-500 font-semibold hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVer;