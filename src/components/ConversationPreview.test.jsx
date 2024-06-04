// src/components/ConversationPreview.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConversationPreview from './ConversationPreview';

const mockConversation = {
  _id: '1',
  participants: [{ username: 'user1' }, { username: 'user2' }],
  lastMessage: { content: 'Last message content' },
};

describe('ConversationPreview', () => {
  const onSelectConversation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders conversation details correctly', () => {
    render(
      <ConversationPreview
        conversation={mockConversation}
        onSelectConversation={onSelectConversation}
      />
    );

    // Check if participants are displayed correctly
    expect(screen.getByText('user1, user2')).toBeInTheDocument();

    // Check if last message is displayed correctly
    expect(screen.getByText('Last message content')).toBeInTheDocument();
  });

  test('calls onSelectConversation when clicked', () => {
    render(
      <ConversationPreview
        conversation={mockConversation}
        onSelectConversation={onSelectConversation}
      />
    );

    // Click on the conversation preview
    fireEvent.click(screen.getByText('user1, user2'));

    // Check if onSelectConversation is called with the correct conversation ID
    expect(onSelectConversation).toHaveBeenCalledWith('1');
  });
});
