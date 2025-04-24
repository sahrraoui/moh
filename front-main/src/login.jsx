import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Google from './assets/google.png';
import { authAPI } from './services/api';
import config from './config/config';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authAPI.login(formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
      setError(errorMessage);
      
      if (err.response?.data?.errorCode === 'ACCOUNT_INACTIVE') {
        navigate('/email-ver', { 
          state: { 
            email: formData.email,
            userId: err.response.data.userId
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/email-ver', { state: { forgotPassword: true } });
  };

  const handleGoogleSignIn = async () => {
    try {
      // Redirect to Google OAuth in the same window
      window.location.href = config.googleAuthUrl;
    } catch (err) {
      setError('Google sign in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[400px] bg-[#e9dfdf] rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Log in</h2>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  className="w-5 h-5 text-gray-600" 
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-rose-500 text-white py-2 rounded-md font-semibold hover:bg-rose-600 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>

        <div className="text-center text-sm mt-3">
          <button 
            onClick={handleForgotPassword}
            className="text-rose-600 font-semibold hover:underline"
          >
            Forgot your password?
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-400" />
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border rounded-md py-2 bg-white hover:bg-gray-100 transition mb-4"
        >
          <img src={Google} alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-rose-500 font-semibold hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;