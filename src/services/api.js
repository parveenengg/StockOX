import axios from 'axios';

// Points to the Spring Boot backend
const USER_API = typeof process !== 'undefined' && process.env.REACT_APP_USER_API 
  ? process.env.REACT_APP_USER_API 
  : (import.meta.env.VITE_USER_API || "https://stockox-user-auth-service.onrender.com");

const API_BASE_URL = `${USER_API}/api/v1`; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
