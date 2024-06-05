import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders login and register links when not authenticated', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.queryByText('Chats')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders chats, profile, and logout links when authenticated', () => {
    localStorage.setItem('token', 'dummyToken');

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText('Chats')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  test('navigates to /chats when Chats link is clicked', () => {
    localStorage.setItem('token', 'dummyToken');

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/chats" element={<div>Chats Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Chats'));
    expect(screen.getByText('Chats Page')).toBeInTheDocument();
  });

  test('navigates to /profile when Profile link is clicked', () => {
    localStorage.setItem('token', 'dummyToken');

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Sidebar />} />
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
