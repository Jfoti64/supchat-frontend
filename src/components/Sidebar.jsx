// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatsIcon from '../assets/icons/chats.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import LoginIcon from '../assets/icons/login.svg';
import RegisterIcon from '../assets/icons/register.svg';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  return (
    <SidebarContainer>
      <nav>
        <NavList>
          {token ? (
            <>
              <NavItem>
                <Link to="/chats">
                  <Icon src={ChatsIcon} alt="Chats" />
                  <div>Chats</div>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/profile">
                  <Icon src={ProfileIcon} alt="Profile" />
                  <div>Profile</div>
                </Link>
              </NavItem>
              <NavItem>
                <LogoutButton onClick={handleLogout}>
                  <Icon src={LogoutIcon} alt="Logout" />
                  <div>Logout</div>
                </LogoutButton>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <Link to="/login">
                  <Icon src={LoginIcon} alt="Login" />
                  <div>Log In</div>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/register">
                  <Icon src={RegisterIcon} alt="Register" />
                  <div>Register</div>
                </Link>
              </NavItem>
            </>
          )}
        </NavList>
      </nav>
    </SidebarContainer>
  );
};

// Styled components
const SidebarContainer = styled.div`
  width: 150px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
  box-sizing: border-box;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavItem = styled.li`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Icon = styled.img`
  width: 45px;
  height: 45px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export default Sidebar;
