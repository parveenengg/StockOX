import api from './api';

export const registerUser = async (userData) => {
  try {
    const payload = {
      companyName: userData.businessName,
      companyEmail: userData.companyEmail,
      companyPhone: userData.phone,
      adminFirstName: userData.firstName,
      adminLastName: userData.lastName,
      adminEmail: userData.adminEmail,
      adminPassword: userData.password,
      adminPhone: userData.phone
    };
    const response = await api.post('/tenants/register', payload);
    return response;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const verifyOtp = async (email, otp, type = 'EMAIL_VERIFY') => {
  try {
    const response = await api.post('/auth/verify-otp', { email, code: otp, type });
    return response;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const resendOtp = async (email, type = 'EMAIL_VERIFY') => {
  try {
    const response = await api.post('/auth/resend-otp', { email, type });
    return response;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const resetPassword = async (email, code, newPassword, confirmPassword) => {
  try {
    const response = await api.post('/auth/reset-password', { email, code, newPassword, confirmPassword });
    return response;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};
