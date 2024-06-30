import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ChatsPage from './pages/ChatsPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden; /* Prevent scrolling */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack sidebar on top on small screens */
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden; /* Prevent scrolling */
  box-sizing: border-box;
  background-color: #f0f2f5;
`;

export default App;
