import React from 'react';
import { render, screen } from '@testing-library/react';
import Conversation from './Conversation';
import { getProfilePictureUrl } from '../api/api';

// Mock the getProfilePictureUrl function
jest.mock('../api/api', () => ({
  ...jest.requireActual('../api/api'),
  getProfilePictureUrl: jest.fn(),
}));

describe('Conversation', () => {
  const messagesInConversation = [
    {
      _id: '1',
      senderId: { _id: 'user1', username: 'user1', profile_picture: 'user1.jpg' },
      content: 'Hello',
    },
    {
      _id: '2',
      senderId: { _id: 'user2', username: 'user2', profile_picture: 'user2.jpg' },
      content: 'Hi',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getProfilePictureUrl.mockImplementation(
      (filename) => `http://localhost:3000/uploads/profile_pictures/${filename}`
    );
  });

  test('renders list of messages with profile pictures', () => {
    render(
      <Conversation
        messagesInConversation={messagesInConversation}
        statusMessage=""
        currentUserId="user1"
      />
    );

    expect(screen.getByText('user1: Hello')).toBeInTheDocument();
    expect(screen.getByText('user2: Hi')).toBeInTheDocument();

    const profilePictures = screen.getAllByAltText('Profile');
    expect(profilePictures.length).toBe(2);
    expect(profilePictures[0]).toHaveAttribute(
      'src',
      'http://localhost:3000/uploads/profile_pictures/user1.jpg'
    );
    expect(profilePictures[1]).toHaveAttribute(
      'src',
      'http://localhost:3000/uploads/profile_pictures/user2.jpg'
    );
  });

  test('displays "No messages found" when list is empty', () => {
    render(<Conversation messagesInConversation={[]} statusMessage="" currentUserId="user1" />);
    expect(screen.getByText('No messages found')).toBeInTheDocument();
  });

  test('displays status message', () => {
    render(
      <Conversation
        messagesInConversation={messagesInConversation}
        statusMessage="Message sent successfully!"
        currentUserId="user1"
      />
    );
    expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
  });
});
