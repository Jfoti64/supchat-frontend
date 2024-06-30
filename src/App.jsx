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
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f0f2f5;
  padding-top: 50px; /* Ensure content is pushed down when sidebar is at the top */

  @media (min-width: 769px) {
    padding-top: 0; /* Remove top padding on larger screens */
  }
`;

export default App;
