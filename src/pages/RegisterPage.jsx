// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../api/api';
import Button from '../components/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    family_name: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log(response.data);
      // Redirect to login or chats page
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="family_name"
        value={formData.family_name}
        onChange={handleChange}
        placeholder="Family Name"
      />
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
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
