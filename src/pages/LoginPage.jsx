// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import Button from '../components/Button';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log(response.data);
      // Redirect to chats page
      navigate('/chats');
    } catch (error) {
      if (error.response && error.response.data) {
        if (process.env.NODE_ENV !== 'test') {
          console.error('Login error:', error.response.data);
          setError(error.response.data.message);
        }
      } else if (error.message) {
        if (process.env.NODE_ENV !== 'test') {
          console.error('Login error:', error.message);
          setError(error.message);
        }
      } else {
        console.error('Login error:', 'An unknown error occurred.');
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <Button $primary type="submit">
        Login
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
