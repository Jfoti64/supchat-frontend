import React from 'react';
import styled from 'styled-components';
import ConversationPreview from './ConversationPreview';
import Button from './Button';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: auto;
`;

const Header = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const ConversationsListStyled = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

const NoConversations = styled.li`
  color: #999;
  text-align: center;
  padding: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 20px;
`;

const NewChatButton = styled(Button)`
  margin-bottom: 20px;
  width: 100%;
`;

const ConversationsList = ({
  onSelectConversation,
  conversations,
  loading,
  handleNewChatClick,
  handleDeleteConversation,
  currentUserId, // Add currentUserId prop
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
              currentUserId={currentUserId} // Pass currentUserId to ConversationPreview
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
