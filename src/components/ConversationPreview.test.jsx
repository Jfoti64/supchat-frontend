// src/components/ConversationPreview.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConversationPreview from './ConversationPreview';

const mockConversation = {
  _id: '1',
  participants: [
    { _id: '1', username: 'user1' },
    { _id: '2', username: 'user2' },
  ],
  lastMessage: { content: 'Last message content' },
};

describe('ConversationPreview', () => {
  const onSelectConversation = jest.fn();
  const handleDeleteConversation = jest.fn();
  const currentUserId = '1'; // Mock current user ID

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders conversation details correctly', () => {
    render(
      <ConversationPreview
        conversation={mockConversation}
        onSelectConversation={onSelectConversation}
        handleDeleteConversation={handleDeleteConversation}
        currentUserId={currentUserId}
      />
    );

    // Check if non-current user participants are displayed correctly
    expect(screen.getByText('user2')).toBeInTheDocument();

    // Check if last message is displayed correctly
    expect(screen.getByText('Last message content')).toBeInTheDocument();
  });

  test('calls onSelectConversation when clicked', () => {
    render(
      <ConversationPreview
        conversation={mockConversation}
        onSelectConversation={onSelectConversation}
        handleDeleteConversation={handleDeleteConversation}
        currentUserId={currentUserId}
      />
    );

    // Click on the conversation preview
    fireEvent.click(screen.getByText('user2'));

    // Check if onSelectConversation is called with the correct conversation ID
    expect(onSelectConversation).toHaveBeenCalledWith('1');
  });

  test('calls handleDeleteConversation when delete button is clicked', () => {
    render(
      <ConversationPreview
        conversation={mockConversation}
        onSelectConversation={onSelectConversation}
        handleDeleteConversation={handleDeleteConversation}
        currentUserId={currentUserId}
      />
    );

    // Click on the delete button
    fireEvent.click(screen.getByTestId('delete-button'));

    // Check if handleDeleteConversation is called with the correct conversation ID
    expect(handleDeleteConversation).toHaveBeenCalledWith('1');
  });

  test('does not call onSelectConversation when delete button is clicked', () => {
    render(
      <ConversationPreview
        conversation={mockConversation}
        onSelectConversation={onSelectConversation}
        handleDeleteConversation={handleDeleteConversation}
        currentUserId={currentUserId}
      />
    );

    // Click on the delete button
    fireEvent.click(screen.getByTestId('delete-button'));

    // Ensure onSelectConversation is not called
    expect(onSelectConversation).not.toHaveBeenCalled();
  });
});
