import React from 'react';
import ConversationPreview from './ConversationPreview';
import Button from './Button';

const ConversationsList = ({
  onSelectConversation,
  conversations,
  loading,
  handleNewChatClick,
  handleDeleteConversation,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Conversations</h2>
      <Button $primary onClick={handleNewChatClick}>
        New Chat
      </Button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationPreview
              key={conversation._id}
              conversation={conversation}
              onSelectConversation={onSelectConversation}
              handleDeleteConversation={handleDeleteConversation}
            />
          ))
        ) : (
          <li>No conversations found</li>
        )}
      </ul>
    </div>
  );
};

export default ConversationsList;
