// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FormContainer, Form, FormInput, ErrorMessage } from '../styles/FormStyles';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    family_name: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

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
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Registration error');
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormInput
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <FormInput
          name="family_name"
          value={formData.family_name}
          onChange={handleChange}
          placeholder="Family Name"
        />
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
          Register
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;
