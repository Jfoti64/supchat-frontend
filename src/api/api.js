const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const sendMessage = (messageData, token) =>
  api.post('/messages/send', messageData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getMessages = (conversationId, token) =>
  api.get(`/messages/${conversationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getUserConversations = (token) =>
  api.get('/messages/user/conversations', {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createConversation = (conversationData, token) =>
  api.post('/messages/user/conversations', conversationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteConversation = (conversationId, token) =>
  api.delete(`/messages/${conversationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getUserByUsername = (username, token) =>
  api.get(`/users/username/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getUser = (id, token) =>
  api.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateUser = (userData, token) =>
  api.put(`/users/${userData.id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
