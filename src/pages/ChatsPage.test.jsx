import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChatsPage from './ChatsPage';
import { getMessages, sendMessage, getUserConversations, getUsers } from '../api/api';
import { jwtDecode } from 'jwt-decode';

jest.mock('../api/api');
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

// Correctly structured mock token
const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJ1c2VySWQiOiJ0ZXN0VXNlcklkIiwiZXhwIjoxNzE3NDA4OTYzfQ.' +
  '4WlzZda_D05MbJBT08OZv1Akdq0jUDHJ7U5u6ne4zQI';

const mockDecodedToken = {
  userId: 'testUserId',
  exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour in the future
};

const mockConversations = [
  {
    _id: '1',
    participants: [
      { _id: 'testUserId', username: 'user1' },
      { _id: 'user2Id', username: 'user2' },
    ],
  },
];

const mockMessages = [
  { _id: '1', content: 'Hello', senderId: 'testUserId' },
  { _id: '2', content: 'Hi', senderId: 'user2Id' },
];

const mockUsers = [
  { _id: 'testUserId', username: 'user1', profile_picture: 'user1.jpg' },
  { _id: 'user2Id', username: 'user2', profile_picture: 'user2.jpg' },
];

describe('ChatsPage', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();
    localStorage.setItem('token', mockToken); // Set a test token
    jwtDecode.mockReturnValue(mockDecodedToken); // Mock the decoded token
    getUserConversations.mockResolvedValue({ data: mockConversations });
    getMessages.mockResolvedValue({ data: mockMessages });
    getUsers.mockResolvedValue({ data: mockUsers }); // Mock getUsers to prevent fetching error
  });

  afterEach(() => {
    localStorage.removeItem('token'); // Clean up token after each test
  });

  test('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <ChatsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Your Conversations')).toBeInTheDocument();
    });
  });

  test('sends a message', async () => {
    sendMessage.mockResolvedValue({ data: { content: 'Test message' } });

    render(
      <MemoryRouter>
        <ChatsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const user2 = screen.getByText('user2');
      expect(user2).toBeInTheDocument();
      fireEvent.click(user2); // Click on user2 to select the conversation
    });

    const input = screen.getByPlaceholderText('Type a message');
    const button = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith(
        {
          senderId: 'testUserId',
          receiverId: 'user2Id',
          content: 'Test message',
        },
        mockToken
      );
    });
  });

  test('redirects to login if token is expired', async () => {
    getUserConversations.mockRejectedValue({ response: { status: 401 } });

    const { container } = render(
      <MemoryRouter>
        <ChatsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.querySelector('p')).toHaveTextContent(
        'Please select a conversation to view messages'
      );
    });
  });
});
