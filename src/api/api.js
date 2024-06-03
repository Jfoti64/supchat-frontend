// src/api/api.js
const API_BASE_URL = typeof importMetaEnv !== 'undefined'
  ? importMetaEnv.VITE_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL;

import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const sendMessage = (messageData, token) => api.post('/messages/send', messageData, {
  headers: { Authorization: `Bearer ${token}` }
});
export const getMessages = (conversationId, token) => api.get(`/messages/${conversationId}`, {
  headers: { Authorization: `Bearer ${token}` }
});

export default api;
