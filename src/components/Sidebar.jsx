import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ChatsIcon from '../assets/icons/chats.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import LoginIcon from '../assets/icons/login.svg';
import RegisterIcon from '../assets/icons/register.svg';
import MenuIcon from '../assets/icons/menu.svg'; // Add a menu icon for the toggle button

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Set initial state based on screen width
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SidebarContainer $isOpen={isOpen}>
      <MenuButton onClick={toggleSidebar}>
        <Icon src={MenuIcon} alt="Menu" />
      </MenuButton>
      <nav>
        <NavList $isOpen={isOpen}>
          {token ? (
            <>
              <NavItem>
                <StyledLink to="/chats">
                  <Icon src={ChatsIcon} alt="Chats" />
                  <NavText>Chats</NavText>
                </StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink to="/profile">
                  <Icon src={ProfileIcon} alt="Profile" />
                  <NavText>Profile</NavText>
                </StyledLink>
              </NavItem>
              <NavItem>
                <LogoutButton onClick={handleLogout}>
                  <Icon src={LogoutIcon} alt="Logout" />
                  <NavText>Logout</NavText>
                </LogoutButton>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <StyledLink to="/login">
                  <Icon src={LoginIcon} alt="Login" />
                  <NavText>Log In</NavText>
                </StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink to="/register">
                  <Icon src={RegisterIcon} alt="Register" />
                  <NavText>Register</NavText>
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
  width: ${(props) => (props.$isOpen ? '250px' : '80px')};
  height: 100vh;
  background-color: #ffffff;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: ${(props) => (props.$isOpen ? '250px' : '60px')};
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
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

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;

  @media (max-width: 768px) {
    ${(props) =>
      props.$isOpen
        ? css`
            display: flex;
          `
        : css`
            display: none;
          `}
  }
`;

const NavItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
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
  width: 45px;
  height: 45px;
`;

const NavText = styled.div`
  font-size: 12px;
  color: #333;
  margin-top: 5px;
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
  text-decoration: none;

  &:hover {
    background-color: #f1f1f1;
    text-decoration: none;
  }
`;

export default Sidebar;
