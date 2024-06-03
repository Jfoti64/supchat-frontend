// src/components/ConversationPreview.jsx
import React from 'react';

const ConversationPreview = ({ conversation, onSelectConversation }) => {
  const participants = conversation.participants.map(participant => participant.username).join(', ');
  const lastMessage = conversation.lastMessage ? conversation.lastMessage.content : 'No messages yet';

  return (
    <li
      onClick={() => onSelectConversation(conversation._id)}
      style={{
        cursor: 'pointer',
        padding: '10px',
        margin: '10px 0',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
        border: '1px solid #ccc',
        transition: 'background-color 0.3s',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
    >
      <div>
        <strong>{participants}</strong>
      </div>
      <div>
        {lastMessage}
      </div>
    </li>
  );
};

export default ConversationPreview;
