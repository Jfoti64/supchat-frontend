import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../components/ProfilePicture';
import { getProfilePictureUrl } from '../api/api';
import { v4 as uuidv4 } from 'uuid';
import { FiTrash2 } from 'react-icons/fi'; // Using react-icons for the trash icon

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

const ParticipantsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Participants = styled.div`
  font-weight: bold;
  margin-left: 10px;
`;

const LastMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 10px;
  overflow: hidden;
`;

const LastMessage = styled.div`
  color: #666;
  margin-top: 5px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #ffe6e6;
    color: #d32f2f; /* Slightly darker red for better visual feedback */
  }
`;

const ConversationPreview = ({
  conversation,
  onSelectConversation,
  handleDeleteConversation,
  currentUserId,
}) => {
  const nonCurrentUserParticipants = conversation.participants
    .filter((participant) => participant._id !== currentUserId)
    .map((participant) => {
      return {
        username: participant.username,
        profile_picture: participant.profile_picture,
      };
    });

  return (
    <PreviewItem onClick={() => onSelectConversation(conversation._id)}>
      <ParticipantsContainer>
        {nonCurrentUserParticipants.map((participant) => (
          <React.Fragment key={uuidv4()}>
            <ProfilePicture src={getProfilePictureUrl(participant.profile_picture)} alt="Profile" />
            <Participants>{participant.username}</Participants>
          </React.Fragment>
        ))}
      </ParticipantsContainer>
      <LastMessageContainer>
        <LastMessage>
          {conversation.lastMessage ? conversation.lastMessage.content : ''}
        </LastMessage>
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteConversation(conversation._id);
          }}
        >
          <FiTrash2 size={18} />
        </DeleteButton>
      </LastMessageContainer>
    </PreviewItem>
  );
};

export default ConversationPreview;
