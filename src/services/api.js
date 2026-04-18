import axios from 'axios';

// Points to the Spring Boot backend
const API_BASE_URL = 'http://localhost:8081/api/v1'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
