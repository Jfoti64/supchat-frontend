// src/components/Conversation.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Conversation from './Conversation';

describe('Conversation', () => {
  const handleMessageSubmit = jest.fn();
  const setMessageToSend = jest.fn();
  const messagesInConversation = [
    { _id: '1', senderId: { username: 'user1' }, content: 'Hello' },
    { _id: '2', senderId: { username: 'user2' }, content: 'Hi' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders conversation title', () => {
    render(
      <Conversation
        handleMessageSubmit={handleMessageSubmit}
        messagesInConversation={messagesInConversation}
        messageToSend=""
        setMessageToSend={setMessageToSend}
        statusMessage=""
      />
    );

    expect(screen.getByText('Conversation')).toBeInTheDocument();
  });

  test('renders list of messages', () => {
    render(
      <Conversation
        handleMessageSubmit={handleMessageSubmit}
        messagesInConversation={messagesInConversation}
        messageToSend=""
        setMessageToSend={setMessageToSend}
        statusMessage=""
      />
    );

    expect(screen.getByText('user1 Hello')).toBeInTheDocument();
    expect(screen.getByText('user2 Hi')).toBeInTheDocument();
  });

  test('displays "No messages found" when list is empty', () => {
    render(
      <Conversation
        handleMessageSubmit={handleMessageSubmit}
        messagesInConversation={[]}
        messageToSend=""
        setMessageToSend={setMessageToSend}
        statusMessage=""
      />
    );

    expect(screen.getByText('No messages found')).toBeInTheDocument();
  });

  test('handles message input change', () => {
    render(
      <Conversation
        handleMessageSubmit={handleMessageSubmit}
        messagesInConversation={messagesInConversation}
        messageToSend=""
        setMessageToSend={setMessageToSend}
        statusMessage=""
      />
    );

    const input = screen.getByPlaceholderText('Type a message');
    fireEvent.change(input, { target: { value: 'New message' } });

    expect(setMessageToSend).toHaveBeenCalledWith('New message');
  });

  test('handles message submit', () => {
    render(
      <Conversation
        handleMessageSubmit={handleMessageSubmit}
        messagesInConversation={messagesInConversation}
        messageToSend="New message"
        setMessageToSend={setMessageToSend}
        statusMessage=""
      />
    );

    const form = screen.getByPlaceholderText('Type a message').closest('form');
    fireEvent.submit(form);

    expect(handleMessageSubmit).toHaveBeenCalled();
  });

  test('displays status message', () => {
    render(
      <Conversation
        handleMessageSubmit={handleMessageSubmit}
        messagesInConversation={messagesInConversation}
        messageToSend=""
        setMessageToSend={setMessageToSend}
        statusMessage="Message sent successfully!"
      />
    );

    expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
  });
});
