import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChatsPage from './pages/ChatsPage';
// import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div style={appContainerStyles}>
        <Sidebar />
        <div style={mainContentStyles}>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chats" element={<ChatsPage />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const appContainerStyles = {
  display: 'flex',
};

const mainContentStyles = {
  flexGrow: 1,
  padding: '20px',
  boxSizing: 'border-box',
};

export default App;
