import axios from 'axios';
import config from '../config/config';

// Create an axios instance with default config
const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Register
  register: (userData) => api.post('/auth/register', userData),
  
  // Activate account
  activateAccount: (data) => api.post('/auth/activate', data),
  
  // Verify OTP
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  
  // Resend OTP
  resendOTP: (data) => api.post('/auth/resend-otp', data),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  
  // Resend activation email
  resendActivation: (email) => api.post('/auth/resend-activation', { email }),
  
  // Google auth
  googleAuth: (data) => api.post('/auth/google', data),
  
  // Logout
  logout: () => api.post('/auth/logout'),
};

// User API endpoints
export const userAPI = {
  // Get user profile
  getProfile: () => api.get('/users/profile'),
  
  // Update user profile
  updateProfile: (data) => api.put('/users/profile', data),
};

export default api; 