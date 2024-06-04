// src/components/Sidebar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Sidebar', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
  });

  test('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText('Chats')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('navigates to /chats when Chats link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
        <Routes>
          <Route path="/chats" element={<div>Chats Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Chats'));
    expect(screen.getByText('Chats Page')).toBeInTheDocument();
  });

  test('navigates to /profile when Profile link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
        <Routes>
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Profile'));
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
  });

  test('removes token from localStorage and navigates to /login on logout', () => {
    localStorage.setItem('token', 'dummyToken');

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Logout'));

    expect(localStorage.getItem('token')).toBeNull();
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});
