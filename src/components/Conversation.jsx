import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { getProfilePictureUrl } from '../api/api';
import ProfilePicture from '../components/ProfilePicture';

const ConversationContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  height: 100%;
`;

const MessagesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 95%;
  overflow-y: auto;
`;

const MessageItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  ${({ $isSent }) =>
    $isSent
      ? css`
          margin-left: auto;
        `
      : css`
          justify-content: flex-start;
          margin-right: auto;
        `}
  flex-direction: ${({ $isSent }) => ($isSent ? 'row-reverse' : 'row')};
  max-width: 100%;
`;

const MessageText = styled.div`
  margin: 0 10px;
  max-width: 70%;
  word-wrap: break-word;
  word-break: break-word; /* Ensure words break correctly */
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
  display: flex;
  align-items: center;
  flex-shrink: 0; /* Prevent shrinking */
`;

const StatusMessage = styled.p`
  font-weight: bold;
`;

const Conversation = ({
  messagesInConversation,
  statusMessage,
  clearStatusMessage,
  currentUserId,
}) => {
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        clearStatusMessage();
      }, 3000); // Status message will disappear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [statusMessage, clearStatusMessage]);

  return (
    <ConversationContainer>
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
                <MessageText $isSent={isSent}>{message.content}</MessageText>
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
