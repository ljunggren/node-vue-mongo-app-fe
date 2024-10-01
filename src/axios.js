// src/axios.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust if necessary
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or use a Vuex getter
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
