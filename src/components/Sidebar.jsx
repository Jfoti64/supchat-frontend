import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={sidebarStyles}>
      <nav>
        <ul style={navListStyles}>
          <li style={navItemStyles}>
            <Link to="/chats">Chats</Link>
          </li>
          <li style={navItemStyles}>
            <Link to="/profile">Profile</Link>
          </li>
          <li style={navItemStyles}>
            <button onClick={handleLogout} style={logoutButtonStyles}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

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
};

const logoutButtonStyles = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  padding: 0,
  fontSize: 'inherit',
  textDecoration: 'underline',
};

export default Sidebar;
