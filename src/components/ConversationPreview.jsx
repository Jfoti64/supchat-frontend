import React from 'react';

const ConversationPreview = ({ conversation, onSelectConversation, handleDeleteConversation }) => {
  return (
    <li
      style={{
        cursor: 'pointer',
        padding: '10px',
        margin: '10px 0',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
        border: '1px solid #ccc',
        transition: 'background-color 0.3s',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
      onClick={() => onSelectConversation(conversation._id)} // Ensure onClick is on the <li> element
    >
      <div>{conversation.participants.map((participant) => participant.username).join(', ')}</div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click from propagating to the <li> element
          handleDeleteConversation(conversation._id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default ConversationPreview;
