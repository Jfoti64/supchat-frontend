import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  getMessages,
  sendMessage,
  getUserConversations,
  getUserByUsername,
  createConversation,
  deleteConversation,
} from '../api/api';
import ConversationsList from '../components/ConversationsList';
import Conversation from '../components/Conversation';
import NewChatForm from '../components/NewChatForm';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 0;
  overflow: hidden;
`;

const ChatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 95%;
  width: 95%;
  max-width: 1200px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const ConversationsSection = styled.div`
  width: 30%;
  border-right: 1px solid #ddd;
  overflow-y: hidden;
  max-width: 350px;
`;

const MessagesSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent the entire section from scrolling */
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: hidden;
  padding: 3px;
  background-color: #f9f9f9;
`;

const InputContainer = styled.form`
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoConversationMessage = styled.p`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #666;
  margin: 0;
`;

const ChatsPage = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [messagesInConversation, setMessagesInConversation] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [displayNewChatForm, setDisplayNewChatForm] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;
  const isTokenExpired = decodedToken ? decodedToken.exp * 1000 < Date.now() : true;

  useEffect(() => {
    if (isTokenExpired) {
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    const fetchConversations = async () => {
      if (!token) {
        console.error('No token found');
        setLoadingConversations(false);
        return;
      }

      try {
        const response = await getUserConversations(token);
        setConversations(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Error fetching conversations:', error);
        }
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations();
  }, [token, navigate, isTokenExpired]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token || !selectedConversationId) {
        return;
      }

      try {
        const messages = await getMessages(selectedConversationId, token);
        setMessagesInConversation(messages.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [selectedConversationId, token, navigate]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const trimmedMessage = messageToSend.trim();
      if (trimmedMessage) {
        const selectedConversation = conversations.find(
          (conversation) => conversation._id === selectedConversationId
        );
        const receiver = selectedConversation.participants.find(
          (participant) => participant._id !== userId
        );


        const messageData = {
          senderId: userId,
          receiverId: receiver._id,
          content: trimmedMessage,
        };

        const response = await sendMessage(messageData, token);
        setStatusMessage('Message sent successfully!');
        setMessageToSend('');
        const messages = await getMessages(selectedConversationId, token);
        setMessagesInConversation(messages.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('Message failed', error);
        setStatusMessage('Message failed. Please try again.');
      }
    }
  };

  const handleNewChatClick = () => {
    setDisplayNewChatForm(!displayNewChatForm);
  };

  const handleCreateNewChat = async (receiverUsername) => {
    try {
      const userResponse = await getUserByUsername(receiverUsername, token);
      const participantId = userResponse.data._id;

      // Check if a conversation already exists with this user
      const existingConversation = conversations.find((conversation) =>
        conversation.participants.some((participant) => participant._id === participantId)
      );

      if (existingConversation) {
        setSelectedConversationId(existingConversation._id);
        setDisplayNewChatForm(false);
        return;
      }

      const conversationData = {
        userId: userId,
        participantId: participantId,
      };

      const response = await createConversation(conversationData, token);
      setConversations([...conversations, response.data]);
      setSelectedConversationId(response.data._id);

      // Refetch conversations to ensure new conversation data is fully populated
      const refetchConversations = await getUserConversations(token);
      setConversations(refetchConversations.data);
      setDisplayNewChatForm(false);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleClose = () => {
    setDisplayNewChatForm(false);
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await deleteConversation(conversationId, token);
      setConversations(conversations.filter((convo) => convo._id !== conversationId));
      setSelectedConversationId(null);
      setMessagesInConversation([]);
      setStatusMessage('Conversation deleted successfully.');
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setStatusMessage('Error deleting conversation. Please try again.');
    }
  };

  const clearStatusMessage = () => {
    setStatusMessage('');
  };

  return (
    <PageContainer>
      <ChatsContainer>
        <ConversationsSection>
          <ConversationsList
            onSelectConversation={setSelectedConversationId}
            conversations={conversations}
            loading={loadingConversations}
            handleNewChatClick={handleNewChatClick}
            handleDeleteConversation={handleDeleteConversation}
            currentUserId={userId}
          />
          <NewChatForm
            displayNewChatForm={displayNewChatForm}
            handleCreateNewChat={handleCreateNewChat}
            handleClose={handleClose}
          />
        </ConversationsSection>
        <MessagesSection>
          {selectedConversationId ? (
            <>
              <MessagesContainer>
                <Conversation
                  messagesInConversation={messagesInConversation}
                  statusMessage={statusMessage}
                  clearStatusMessage={clearStatusMessage}
                  currentUserId={userId}
                />
              </MessagesContainer>
              <InputContainer onSubmit={handleMessageSubmit}>
                <Input
                  type="text"
                  value={messageToSend}
                  onChange={(e) => setMessageToSend(e.target.value)}
                  placeholder="Type a message"
                />
                <SendButton type="submit">Send</SendButton>
              </InputContainer>
            </>
          ) : (
            <NoConversationMessage>
              Please select a conversation to view messages
            </NoConversationMessage>
          )}
        </MessagesSection>
      </ChatsContainer>
    </PageContainer>
  );
};

export default ChatsPage;
