import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewChatForm from './NewChatForm';
import { getUsers, getProfilePictureUrl } from '../api/api';
import { jwtDecode } from 'jwt-decode';

jest.mock('../api/api');
jest.mock('jwt-decode');

describe('NewChatForm', () => {
  const handleCreateNewChat = jest.fn();
  const handleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('token', 'dummyToken');
    jwtDecode.mockReturnValue({ userId: 'currentUserId' });
    getProfilePictureUrl.mockImplementation(
      (filename) => `http://localhost:3000/uploads/profile_pictures/${filename}`
    );
  });

  const renderComponent = (props = {}) => {
    render(
      <NewChatForm
        displayNewChatForm={true}
        handleCreateNewChat={handleCreateNewChat}
        handleClose={handleClose}
        {...props}
      />
    );
  };

  test('renders the form when displayNewChatForm is true', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  test('does not render the form when displayNewChatForm is false', () => {
    renderComponent({ displayNewChatForm: false });
    expect(screen.queryByPlaceholderText('Search users...')).not.toBeInTheDocument();
  });

  test('calls handleCreateNewChat with the correct username on user item click', async () => {
    getUsers.mockResolvedValue({
      data: [
        { _id: '1', username: 'user1', profile_picture: 'user1.jpg' },
        { _id: '2', username: 'user2', profile_picture: 'user2.jpg' },
      ],
    });

    renderComponent();

    // Ensure users are fetched and displayed
    expect(await screen.findByText('user1')).toBeInTheDocument();
    expect(await screen.findByText('user2')).toBeInTheDocument();

    // Click on a user item
    fireEvent.click(screen.getByText('user1'));
    expect(handleCreateNewChat).toHaveBeenCalledWith('user1');
  });

  test('filters users based on search query', async () => {
    getUsers.mockResolvedValue({
      data: [
        { _id: '1', username: 'user1', profile_picture: 'user1.jpg' },
        { _id: '2', username: 'user2', profile_picture: 'user2.jpg' },
      ],
    });

    renderComponent();

    // Ensure users are fetched and displayed
    expect(await screen.findByText('user1')).toBeInTheDocument();
    expect(await screen.findByText('user2')).toBeInTheDocument();

    // Type in the search input
    fireEvent.change(screen.getByPlaceholderText('Search users...'), {
      target: { value: 'user1' },
    });

    // Only matching users should be displayed
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.queryByText('user2')).not.toBeInTheDocument();
  });

  test('calls handleClose when clicking outside the form', async () => {
    renderComponent();

    // Click on the overlay (outside the form)
    fireEvent.click(screen.getByTestId('overlay'));
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
