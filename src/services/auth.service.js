import api from './api';

export const registerUser = async (userData) => {
  // return api.post('/auth/register', userData);
  // Simulating network request for Demo
  return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 800));
};

export const verifyOtp = async (email, otp) => {
  // return api.post('/auth/verify', { email, otp });
  // Simulating network request for Demo
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp.length === 6) resolve({ data: { success: true, token: 'demo_token' } });
      else reject(new Error('Invalid OTP'));
    }, 500);
  });
};

export const loginUser = async (credentials) => {
  // return api.post('/auth/login', credentials);
  return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true, token: 'demo_token' } }), 800));
};
