import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfilePicture from '../components/ProfilePicture';
import { getProfilePictureUrl } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import { getUsers } from '../api/api';

const Overlay = styled.div.attrs(() => ({ role: 'dialog' }))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Username = styled.span`
  margin-left: 10px;
`;

const NewChatForm = ({ displayNewChatForm, handleCreateNewChat, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  const decodedToken = token ? jwtDecode(token) : null;
  const currentUserId = decodedToken ? decodedToken.userId : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(token); // Pass the token
        const allUsers = response.data;
        // Filter out the current user
        const otherUsers = allUsers.filter((user) => user._id !== currentUserId);
        setUsers(otherUsers);
        setFilteredUsers(otherUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token, currentUserId]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, users]);

  if (!displayNewChatForm) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick} data-testid="overlay">
      <FormContainer>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <UserList>
          {filteredUsers.map((user) => (
            <UserItem key={user._id} onClick={() => handleCreateNewChat(user.username)}>
              <ProfilePicture src={getProfilePictureUrl(user.profile_picture)} alt="Profile" />
              <Username>{user.username}</Username>
            </UserItem>
          ))}
        </UserList>
      </FormContainer>
    </Overlay>
  );
};

export default NewChatForm;
