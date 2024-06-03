import React from 'react';

const ConversationsList = ({ onSelectConversation, conversations, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Conversations</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conversation) => (
            <li
              key={conversation._id}
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
              {conversation.participants.join(', ')}
            </li>
          ))
        ) : (
          <li>No conversations found</li>
        )}
      </ul>
    </div>
  );
};

export default ConversationsList;
