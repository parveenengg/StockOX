import api from './api';
import { mockUsers } from '../mock/users.mock.js';

let localUsers = [...mockUsers];

export const getMyProfile = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data; // This is ApiResponse
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const updateMyProfile = async (profileData) => {
  try {
    const response = await api.put('/users/me', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/users/me/password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const getAllUsers = async () => {
  const isDemoUser = sessionStorage.getItem('userEmail') === 'demo@gmail.com';
  if (isDemoUser) {
    return new Promise((resolve) => setTimeout(() => resolve({
      message: "Users fetched (mock)",
      data: localUsers
    }), 500));
  }

  try {
    const response = await api.get('/users/admin/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};

export const inviteUser = async (inviteData) => {
  const isDemoUser = sessionStorage.getItem('userEmail') === 'demo@gmail.com';
  if (isDemoUser) {
    return new Promise((resolve) => setTimeout(() => {
      const newUser = {
        id: `usr-${Math.floor(100 + Math.random() * 900)}`,
        firstName: inviteData.firstName,
        lastName: inviteData.lastName,
        email: inviteData.email,
        role: inviteData.role,
        status: 'PENDING'
      };
      localUsers = [newUser, ...localUsers];
      resolve({
        message: "Invite sent (mock)",
        data: newUser
      });
    }, 800));
  }

  try {
    const response = await api.post('/users/admin/invite', inviteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error(error.message);
  }
};
