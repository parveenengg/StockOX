import axios from 'axios';

// Currently points to mock/localhost. Easily replaced with production API URL.
const API_BASE_URL = 'http://localhost:5000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
