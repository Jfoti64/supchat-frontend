import React, { useState } from 'react';

const NewChatForm = ({ displayNewChatForm, handleCreateNewChat }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateNewChat(username);
    setUsername('');
  };

  if (!displayNewChatForm) return null;

  return (
    <div style={newChatFormStyles}>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Chat</button>
      </form>
    </div>
  );
};

const newChatFormStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
};

export default NewChatForm;
