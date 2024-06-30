import React from 'react';
import styled from 'styled-components';
import ConversationPreview from './ConversationPreview';
import Button from './Button';

// Styled components
const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: auto;
  overflow-y: hidden;
  flex-shrink: 1; /* Allow shrinking */
  align-items: center; /* Center content horizontally */
`;

const Header = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 16px;
  }
`;

const ConversationsListStyled = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1;
  overflow-y: auto;
  width: 100%; /* Ensure it takes the full width of the container */

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const NoConversations = styled.li`
  color: #999;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const NewChatButton = styled(Button)`
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ConversationsList = ({
  onSelectConversation,
  conversations,
  loading,
  handleNewChatClick,
  handleDeleteConversation,
  currentUserId,
}) => {
  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <Header>Your Conversations</Header>
      <NewChatButton $primary onClick={handleNewChatClick}>
        New Chat
      </NewChatButton>
      <ConversationsListStyled>
        {Array.isArray(conversations) && conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationPreview
              key={conversation._id}
              conversation={conversation}
              onSelectConversation={onSelectConversation}
              handleDeleteConversation={handleDeleteConversation}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <NoConversations>No conversations found</NoConversations>
        )}
      </ConversationsListStyled>
    </Container>
  );
};

export default ConversationsList;
