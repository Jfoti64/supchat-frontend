import React from 'react';
import styled from 'styled-components';
import { getProfilePictureUrl } from '../api/api';
import ProfilePicture from '../components/ProfilePicture';

const ConversationContainer = styled.div`
  padding: 20px;
`;

const MessagesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const MessageText = styled.div`
  margin-left: 10px;
`;

const StatusMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const Conversation = ({ messagesInConversation, statusMessage }) => {
  return (
    <ConversationContainer>
      <h2>Conversation</h2>
      <MessagesList>
        {messagesInConversation.length > 0 ? (
          messagesInConversation.map((message) => (
            <MessageItem key={message._id}>
              <ProfilePicture
                src={getProfilePictureUrl(message.senderId.profile_picture)}
                alt="Profile"
              />
              <MessageText>
                {message.senderId.username}: {message.content}
              </MessageText>
            </MessageItem>
          ))
        ) : (
          <MessageItem>No messages found</MessageItem>
        )}
      </MessagesList>
      {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
    </ConversationContainer>
  );
};

export default Conversation;
