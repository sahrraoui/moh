# Frontend Application

This is a React frontend application that connects to a Node.js backend API.

## API Integration

The application uses Axios to communicate with the backend API. All API calls are centralized in the `src/services/api.js` file.

### Configuration

The API base URL can be configured in `src/config/config.js`:

```javascript
const config = {
  apiBaseUrl: 'http://localhost:5000/api',
  // Other configuration settings
};
```

Change the `apiBaseUrl` to match your backend server URL.

### Using the API Service

The API service provides methods for all API endpoints. Here's how to use it:

```javascript
import { authAPI, userAPI } from './services/api';

// Login
const login = async () => {
  try {
    const response = await authAPI.login({
      email: 'user@example.com',
      password: 'password123'
    });
    // Handle successful login
  } catch (error) {
    // Handle error
  }
};

// Get user profile
const getProfile = async () => {
  try {
    const response = await userAPI.getProfile();
    // Handle profile data
  } catch (error) {
    // Handle error
  }
};
```

## Available API Endpoints

### Authentication

- `authAPI.login(credentials)` - Login with email and password
- `authAPI.register(userData)` - Register a new user
- `authAPI.activateAccount(data)` - Activate a user account
- `authAPI.verifyOTP(data)` - Verify OTP code
- `authAPI.resendOTP(data)` - Resend OTP code
- `authAPI.forgotPassword(email)` - Request password reset
- `authAPI.resetPassword(token, password)` - Reset password
- `authAPI.resendActivation(email)` - Resend activation email
- `authAPI.googleAuth(data)` - Google authentication
- `authAPI.logout()` - Logout user

### User

- `userAPI.getProfile()` - Get user profile
- `userAPI.updateProfile(data)` - Update user profile

## Development

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```
