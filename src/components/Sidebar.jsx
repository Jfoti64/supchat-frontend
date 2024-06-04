import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div style={sidebarStyles}>
      <nav>
        <ul style={navListStyles}>
          {token ? (
            <>
              <li style={navItemStyles}>
                <Link to="/chats">
                  <img src={ChatsIcon} alt="Chats" style={iconStyles} />
                  <span style={linkTextStyles}>Chats</span>
                </Link>
              </li>
              <li style={navItemStyles}>
                <Link to="/profile">
                  <img src={ProfileIcon} alt="Profile" style={iconStyles} />
                  <span style={linkTextStyles}>Profile</span>
                </Link>
              </li>
              <li style={navItemStyles}>
                <button onClick={handleLogout} style={logoutButtonStyles}>
                  <img src={LogoutIcon} alt="Logout" style={iconStyles} />
                  <span style={linkTextStyles}>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li style={navItemStyles}>
                <Link to="/login">
                  <img src={LoginIcon} alt="Login" style={iconStyles} />
                  <span style={linkTextStyles}>Login</span>
                </Link>
              </li>
              <li style={navItemStyles}>
                <Link to="/register">
                  <img src={RegisterIcon} alt="Register" style={iconStyles} />
                  <span style={linkTextStyles}>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

// Styles
const sidebarStyles = {
  width: '250px',
  height: '100vh',
  backgroundColor: '#f8f9fa',
  borderRight: '1px solid #ddd',
  padding: '20px',
  boxSizing: 'border-box',
};

const navListStyles = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const navItemStyles = {
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
};

const linkTextStyles = {
  marginLeft: '10px',
};

const iconStyles = {
  width: '24px',
  height: '24px',
};

const logoutButtonStyles = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  padding: 0,
  fontSize: 'inherit',
  textDecoration: 'underline',
  display: 'flex',
  alignItems: 'center',
};

export default Sidebar;
