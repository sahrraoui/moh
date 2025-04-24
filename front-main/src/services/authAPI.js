import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authAPI = {
  logout: async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Logout API error:', error);
      throw error;
    }
  },
};

export default authAPI; 