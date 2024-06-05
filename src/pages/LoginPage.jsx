// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import Button from '../components/Button';
import { FormContainer, Form, FormInput, ErrorMessage } from '../styles/FormStyles';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response && response.data && response.data.token) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/chats');
      } else {
        setError('Login error: No token found in response');
      }
    } catch (error) {
      setError('Login error: ' + error.message);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormInput
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <FormInput
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <Button $primary type="submit">
          Login
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
