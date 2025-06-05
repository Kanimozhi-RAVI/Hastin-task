import axios from 'axios';

// 🛠 Create Axios instance
const api = axios.create({
  baseURL: 'https://hastin-container.com/staging/app',
});

// 🛡 Add interceptor to attach BslogiKey token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // store this in localStorage earlier
  if (token) {
    config.headers['Authorization'] = `BslogiKey ${token}`;
  }
  return config;
});

export default api;
