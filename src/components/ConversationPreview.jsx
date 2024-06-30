import React from 'react';
import styled from 'styled-components';
import ProfilePicture from '../components/ProfilePicture';
import { getProfilePictureUrl } from '../api/api';
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
  flex-direction: row;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Change to column layout on small screens */
    padding: 5px;
    margin: 5px 0;
  }
`;

const ParticipantsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 70%; /* Adjust width to fit within the container */
  overflow: hidden; /* Ensure text overflow is handled */

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center; /* Center content in column layout */
    flex-direction: column; /* Change to column layout for small screens */
  }
`;

const Participants = styled.div`
  font-weight: bold;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Truncate long text with ellipsis */
  max-width: 100%; /* Ensure it doesn't exceed container width */

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 5px; /* Add margin for spacing in column layout */
    font-size: 12px;
    text-align: center;
  }
`;

const LastMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 10px;
  overflow: hidden;
  align-items: center; /* Center items horizontally */

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 5px; /* Add margin for spacing in column layout */
    font-size: 12px;
    align-items: center;
    width: 100%;
  }
`;

const LastMessage = styled.div`
  color: #666;
  margin-top: 5px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Truncate long text with ellipsis */
  width: 100%; /* Ensure the message takes the full width */

  @media (max-width: 768px) {
    margin-top: 2px;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center; /* Center icon within button */
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
  margin-top: 5px; /* Add some spacing from the message */

  &:hover {
    background-color: #ffe6e6;
    color: #d32f2f;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    margin-top: 5px; /* Adjust spacing in column layout */
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
        id: participant._id, // Use the participant's unique ID
        username: participant.username,
        profile_picture: participant.profile_picture,
      };
    });

  return (
    <PreviewItem onClick={() => onSelectConversation(conversation._id)}>
      <ParticipantsContainer>
        {nonCurrentUserParticipants.map((participant) => (
          <React.Fragment key={participant.id}>
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
