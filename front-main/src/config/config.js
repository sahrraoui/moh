// API Configuration
const config = {
  // API base URL - change this to your backend URL
  apiBaseUrl: 'http://localhost:5000/api',
  
  // Google OAuth configuration
  googleAuthUrl: 'http://localhost:5000/auth/google',
  
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    google: '/auth/google'
  },
  
  // Other configuration settings can be added here
};

export default config; 