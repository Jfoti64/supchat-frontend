import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import { getUsers } from '../api/api';

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
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

const NewChatForm = ({ displayNewChatForm, handleCreateNewChat }) => {
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

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <UserList>
        {filteredUsers.map((user) => (
          <UserItem key={user._id} onClick={() => handleCreateNewChat(user.username)}>
            {user.username}
          </UserItem>
        ))}
      </UserList>
    </div>
  );
};

export default NewChatForm;
