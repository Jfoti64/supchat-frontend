import React from 'react';
import styled, { css } from 'styled-components';
import { getProfilePictureUrl } from '../api/api';
import ProfilePicture from '../components/ProfilePicture';

const ConversationContainer = styled.div`
  padding: 20px;
  max-width: 800px;
`;

const MessagesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  ${({ $isSent }) =>
    $isSent
      ? css`
          justify-items: flex-end;
          text-align: right;
          margin-left: auto;
        `
      : css`
          justify-items: flex-start;
          text-align: left;
          margin-right: auto;
        `}
  flex-direction: ${({ $isSent }) => ($isSent ? 'row-reverse' : 'row')};
`;

const MessageText = styled.div`
  margin: 0 10px;
  max-width: 70%;
  word-wrap: break-word;
  ${({ $isSent }) =>
    $isSent
      ? css`
          background-color: #dcf8c6;
          border-radius: 10px 10px 0 10px;
        `
      : css`
          background-color: #fff;
          border-radius: 10px 10px 10px 0;
        `}
  padding: 10px;
`;

const StatusMessage = styled.p`
  font-weight: bold;
`;

const Conversation = ({ messagesInConversation, statusMessage, currentUserId }) => {
  return (
    <ConversationContainer>
      <h2>Conversation</h2>
      <MessagesList>
        {messagesInConversation.length > 0 ? (
          messagesInConversation.map((message) => {
            const isSent = message.senderId._id === currentUserId;
            return (
              <MessageItem key={message._id} $isSent={isSent}>
                <ProfilePicture
                  src={getProfilePictureUrl(message.senderId.profile_picture)}
                  alt="Profile"
                />
                <MessageText $isSent={isSent}>
                  {message.senderId.username}: {message.content}
                </MessageText>
              </MessageItem>
            );
          })
        ) : (
          <MessageItem>No messages found</MessageItem>
        )}
      </MessagesList>
      {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
    </ConversationContainer>
  );
};

export default Conversation;
