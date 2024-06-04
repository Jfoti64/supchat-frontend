// src/components/ConversationsList.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConversationsList from './ConversationsList';
import ConversationPreview from './ConversationPreview';
import Button from './Button';

// Mock ConversationPreview and Button components
jest.mock(
  './ConversationPreview',
  () =>
    ({ conversation, onSelectConversation, handleDeleteConversation }) =>
      (
        <li>
          <div onClick={() => onSelectConversation(conversation._id)}>
            {conversation.participants.map((p) => p.username).join(', ')}
          </div>
          <button onClick={() => handleDeleteConversation(conversation._id)}>Delete</button>
        </li>
      )
);

jest.mock('./Button', () => ({ children, ...props }) => <button {...props}>{children}</button>);

describe('ConversationsList', () => {
  const mockConversations = [
    { _id: '1', participants: [{ username: 'user1' }, { username: 'user2' }] },
    { _id: '2', participants: [{ username: 'user3' }, { username: 'user4' }] },
  ];
  const onSelectConversation = jest.fn();
  const handleNewChatClick = jest.fn();
  const handleDeleteConversation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <ConversationsList
        onSelectConversation={onSelectConversation}
        conversations={[]}
        loading={true}
        handleNewChatClick={handleNewChatClick}
        handleDeleteConversation={handleDeleteConversation}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders list of conversations', () => {
    render(
      <ConversationsList
        onSelectConversation={onSelectConversation}
        conversations={mockConversations}
        loading={false}
        handleNewChatClick={handleNewChatClick}
        handleDeleteConversation={handleDeleteConversation}
      />
    );

    expect(screen.getByText('user1, user2')).toBeInTheDocument();
    expect(screen.getByText('user3, user4')).toBeInTheDocument();
  });

  test('displays "No conversations found" when list is empty', () => {
    render(
      <ConversationsList
        onSelectConversation={onSelectConversation}
        conversations={[]}
        loading={false}
        handleNewChatClick={handleNewChatClick}
        handleDeleteConversation={handleDeleteConversation}
      />
    );

    expect(screen.getByText('No conversations found')).toBeInTheDocument();
  });

  test('calls handleNewChatClick when New Chat button is clicked', () => {
    render(
      <ConversationsList
        onSelectConversation={onSelectConversation}
        conversations={mockConversations}
        loading={false}
        handleNewChatClick={handleNewChatClick}
        handleDeleteConversation={handleDeleteConversation}
      />
    );

    fireEvent.click(screen.getByText('New Chat'));
    expect(handleNewChatClick).toHaveBeenCalled();
  });

  test('calls onSelectConversation when a conversation is selected', () => {
    render(
      <ConversationsList
        onSelectConversation={onSelectConversation}
        conversations={mockConversations}
        loading={false}
        handleNewChatClick={handleNewChatClick}
        handleDeleteConversation={handleDeleteConversation}
      />
    );

    fireEvent.click(screen.getByText('user1, user2'));
    expect(onSelectConversation).toHaveBeenCalledWith('1');
  });

  test('calls handleDeleteConversation when a conversation is deleted', () => {
    render(
      <ConversationsList
        onSelectConversation={onSelectConversation}
        conversations={mockConversations}
        loading={false}
        handleNewChatClick={handleNewChatClick}
        handleDeleteConversation={handleDeleteConversation}
      />
    );

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(handleDeleteConversation).toHaveBeenCalledWith('1');
  });
});
