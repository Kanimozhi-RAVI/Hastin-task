// src/utils/axiosInstance.js
import axios from 'axios';

// Create instance
const api = axios.create({
  baseURL: 'https://hastin-container.com/staging/app/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor: Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `BslogiKey ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// ❌ Response Interceptor: Auto logout on 401
api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.clear();
    window.location.href = '/login'; // Auto redirect
  }
  return Promise.reject(error);
});

export default api;
