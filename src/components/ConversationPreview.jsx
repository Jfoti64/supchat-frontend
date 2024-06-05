import React from 'react';
import styled from 'styled-components';

const PreviewItem = styled.li`
  cursor: pointer;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Participants = styled.div`
  font-weight: bold;
`;

const LastMessage = styled.div`
  color: #666;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff4d4f;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ConversationPreview = ({ conversation, onSelectConversation, handleDeleteConversation }) => {
  return (
    <PreviewItem onClick={() => onSelectConversation(conversation._id)}>
      <div>
        <Participants>
          {conversation.participants.map((participant) => participant.username).join(', ')}
        </Participants>
        <LastMessage>
          {conversation.lastMessage ? conversation.lastMessage.content : ''}
        </LastMessage>
      </div>
      <DeleteButton
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteConversation(conversation._id);
        }}
      >
        Delete
      </DeleteButton>
    </PreviewItem>
  );
};

export default ConversationPreview;
