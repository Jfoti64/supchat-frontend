// src/pages/ProfilePage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { getUser, updateUser } from '../api/api';
import { jwtDecode } from 'jwt-decode';

jest.mock('../api/api');
jest.mock('jwt-decode');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ProfilePage', () => {
  const mockNavigate = jest.fn();
  const mockToken = 'mockToken';
  const mockDecodedToken = { userId: 'mockUserId', exp: Math.floor(Date.now() / 1000) + 3600 };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', mockToken);
    jwtDecode.mockReturnValue(mockDecodedToken);
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders loading state initially', async () => {
    const mockUserData = { first_name: 'John', family_name: 'Doe', bio: 'Bio' };
    getUser.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: mockUserData }), 100))
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    });
  });

  test('fetches and displays user data', async () => {
    const mockUserData = { first_name: 'John', family_name: 'Doe', bio: 'Bio' };
    getUser.mockResolvedValueOnce({ data: mockUserData });

    await act(async () => {
      render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Bio')).toBeInTheDocument();
    });
  });

  test('handles user update', async () => {
    const mockUserData = { first_name: 'John', family_name: 'Doe', bio: 'Bio' };
    getUser.mockResolvedValueOnce({ data: mockUserData });
    updateUser.mockResolvedValueOnce({ data: mockUserData });

    await act(async () => {
      render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Bio')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByPlaceholderText('Family Name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByPlaceholderText('Bio'), { target: { value: 'New Bio' } });

    fireEvent.click(screen.getByText('Update Profile'));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith(
        { first_name: 'Jane', family_name: 'Smith', bio: 'New Bio', id: 'mockUserId' },
        mockToken
      );
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
      expect(screen.getByDisplayValue('New Bio')).toBeInTheDocument();
    });
  });

  test('handles token expiration', async () => {
    const expiredToken = { userId: 'mockUserId', exp: Math.floor(Date.now() / 1000) - 3600 };
    jwtDecode.mockReturnValueOnce(expiredToken);

    await act(async () => {
      render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  test('handles API errors gracefully', async () => {
    getUser.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Error fetching user data')).toBeInTheDocument();
    });
  });
});
