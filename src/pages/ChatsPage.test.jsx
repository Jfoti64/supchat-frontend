import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChatsPage from './ChatsPage';
import { getMessages, sendMessage, getUserConversations } from '../api/api';
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
  { _id: '1', participants: [{ username: 'user1' }, { username: 'user2' }] },
];
const mockMessages = [
  { _id: '1', content: 'Hello', senderId: { username: 'user1' } },
  { _id: '2', content: 'Hi', senderId: { username: 'user2' } },
];

describe('ChatsPage', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    jest.clearAllMocks();
    localStorage.setItem('token', mockToken); // Set a test token
    jwtDecode.mockReturnValue(mockDecodedToken); // Mock the decoded token
  });

  afterEach(() => {
    localStorage.removeItem('token'); // Clean up token after each test
  });

  test('renders without crashing', async () => {
    getUserConversations.mockResolvedValue({ data: mockConversations });
    getMessages.mockResolvedValue({ data: mockMessages });

    render(
      <MemoryRouter>
        <ChatsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Your Conversations')).toBeInTheDocument();
    });
  });

  test('displays conversations and messages', async () => {
    getUserConversations.mockResolvedValue({ data: mockConversations });
    getMessages.mockResolvedValue({ data: mockMessages });

    render(
      <MemoryRouter>
        <ChatsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const conversationItem = screen.getByText(
        (content, element) => element.textContent === 'user1user2'
      );
      expect(conversationItem).toBeInTheDocument();
      fireEvent.click(conversationItem);
    });

    await waitFor(() => {
      expect(screen.getByText(/Hello/i)).toBeInTheDocument();
      expect(screen.getByText(/Hi/i)).toBeInTheDocument();
    });
  });

  test('sends a message', async () => {
    getUserConversations.mockResolvedValue({ data: mockConversations });
    getMessages.mockResolvedValue({ data: mockMessages });
    sendMessage.mockResolvedValue({ data: { content: 'Test message' } });

    render(
      <MemoryRouter>
        <ChatsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const conversationItem = screen.getByText(
        (content, element) => element.textContent === 'user1user2'
      );
      expect(conversationItem).toBeInTheDocument();
      fireEvent.click(conversationItem);
    });

    const input = screen.getByPlaceholderText('Type a message');
    const button = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith(
        {
          senderId: 'testUserId',
          receiverId: { username: 'user1' },
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
