import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../components/ProfilePicture';
import { getProfilePictureUrl } from '../api/api';
import { v4 as uuidv4 } from 'uuid';

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
`;

const Participants = styled.div`
  font-weight: bold;
  margin-left: 10px;
`;

const LastMessage = styled.div`
  color: #666;
  margin-top: 5px;
  text-align: center;
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
      <div>
        <LastMessage>
          {conversation.lastMessage ? conversation.lastMessage.content : ''}
        </LastMessage>
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteConversation(conversation._id);
          }}
        >
          Delete
        </DeleteButton>
      </div>
    </PreviewItem>
  );
};

export default ConversationPreview;
