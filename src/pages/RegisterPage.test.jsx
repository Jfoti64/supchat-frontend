// src/pages/RegisterPage.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { registerUser } from '../api/api';

// Mock the registerUser function
jest.mock('../api/api');

describe('RegisterPage', () => {
  it('renders the registration form', () => {
    render(<RegisterPage />);

    // Check if form elements are rendered
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Family Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('submits the form correctly', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Family Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Register'));

    expect(registerUser).toHaveBeenCalledWith({
      first_name: 'John',
      family_name: 'Doe',
      username: 'johndoe',
      password: 'password123',
    });
  });

  it('handles registration errors', async () => {
    registerUser.mockRejectedValueOnce(new Error('Network Error'));

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Family Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Register'));

    // You can add more assertions here to check how the component handles the error
  });
});
