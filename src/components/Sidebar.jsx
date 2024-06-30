import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatsIcon from '../assets/icons/chats.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import LoginIcon from '../assets/icons/login.svg';
import RegisterIcon from '../assets/icons/register.svg';

const Sidebar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SidebarContainer $isSmallScreen={isSmallScreen}>
      <nav>
        <NavList $isSmallScreen={isSmallScreen}>
          {token ? (
            <>
              <NavItem>
                <StyledLink to="/chats">
                  <Icon src={ChatsIcon} alt="Chats" $isSmallScreen={isSmallScreen} />
                  <NavText $isSmallScreen={isSmallScreen}>Chats</NavText>
                </StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink to="/profile">
                  <Icon src={ProfileIcon} alt="Profile" $isSmallScreen={isSmallScreen} />
                  <NavText $isSmallScreen={isSmallScreen}>Profile</NavText>
                </StyledLink>
              </NavItem>
              <NavItem>
                <LogoutButton onClick={handleLogout}>
                  <Icon src={LogoutIcon} alt="Logout" $isSmallScreen={isSmallScreen} />
                  <NavText $isSmallScreen={isSmallScreen}>Logout</NavText>
                </LogoutButton>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <StyledLink to="/login">
                  <Icon src={LoginIcon} alt="Login" $isSmallScreen={isSmallScreen} />
                  <NavText $isSmallScreen={isSmallScreen}>Log In</NavText>
                </StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink to="/register">
                  <Icon src={RegisterIcon} alt="Register" $isSmallScreen={isSmallScreen} />
                  <NavText $isSmallScreen={isSmallScreen}>Register</NavText>
                </StyledLink>
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
  width: ${(props) => (props.$isSmallScreen ? '100%' : '100px')};
  height: ${(props) => (props.$isSmallScreen ? '50px' : '100vh')};
  background-color: #ffffff;
  padding: ${(props) => (props.$isSmallScreen ? '10px 0' : '20px 0')};
  box-shadow: ${(props) =>
    props.$isSmallScreen ? '0 2px 5px rgba(0, 0, 0, 0.1)' : '2px 0 5px rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: ${(props) => (props.$isSmallScreen ? 'row' : 'column')};
  align-items: center;
  justify-content: ${(props) => (props.$isSmallScreen ? 'center' : 'flex-start')};
  transition: all 0.3s ease;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${(props) => (props.$isSmallScreen ? 'row' : 'column')};
  align-items: center;
  width: 100%;
  justify-content: center;

  @media (min-width: 769px) {
    justify-content: flex-start; /* Align items to the top on large screens */
  }
`;

const NavItem = styled.li`
  width: ${(props) => (props.$isSmallScreen ? 'auto' : '100%')};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none; // Ensure no underline
  color: inherit;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    text-decoration: none; // Ensure no underline on hover
  }
`;

const Icon = styled.img`
  width: ${(props) => (props.$isSmallScreen ? '35px' : '45px')};
  height: ${(props) => (props.$isSmallScreen ? '35px' : '45px')};
`;

const NavText = styled.div`
  font-size: 12px;
  color: #333;
  margin-top: 5px;
  display: ${(props) => (props.$isSmallScreen ? 'none' : 'block')};
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 10px;
  font-size: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export default Sidebar;
