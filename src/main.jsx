import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Restore session from localStorage if "Keep me signed in" was used previously
const savedEmail = localStorage.getItem('userEmail');
if (savedEmail && !sessionStorage.getItem('userEmail')) {
  sessionStorage.setItem('userEmail', savedEmail);
  const savedName = localStorage.getItem('userName');
  if (savedName) sessionStorage.setItem('userName', savedName);
  const savedToken = localStorage.getItem('accessToken');
  if (savedToken) sessionStorage.setItem('accessToken', savedToken);
  const savedUserId = localStorage.getItem('userId');
  if (savedUserId) sessionStorage.setItem('userId', savedUserId);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
