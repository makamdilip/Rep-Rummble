import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this to your server URL
// For local development with Android emulator, use 10.0.2.2 instead of localhost
// For iOS simulator, localhost works fine
// For physical devices, use your computer's IP address
const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000/api'  // Android emulator
  : 'https://your-production-api.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for image uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('rep_rumble_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage
      await AsyncStorage.multiRemove(['rep_rumble_token', 'rep_rumble_user']);
    }
    return Promise.reject(error);
  }
);

export default api;
