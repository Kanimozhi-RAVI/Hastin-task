import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hastin-container.com/staging/app',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `BslogiKey ${token}`;
  }
  return config;
});

export default api;
