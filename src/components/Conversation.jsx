import React from 'react';

const Conversation = ({
  handleMessageSubmit,
  messagesInConversation,
  messageToSend,
  setMessageToSend,
  statusMessage,
}) => {
  return (
    <div>
      <h2>Conversation</h2>
      <ul>
        {messagesInConversation.length > 0 ? (
          messagesInConversation.map((message) => (
            <li key={message._id}>
              {message.senderId.username} {message.content}
            </li>
          ))
        ) : (
          <li>No messages found</li>
        )}
      </ul>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default Conversation;
