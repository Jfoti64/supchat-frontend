// ChatsPage.jsx
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

  // Decode the token to get the user ID and check expiration
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
        const receiverId = selectedConversation.participants.find(
          (participant) => participant !== userId
        );

        const messageData = {
          senderId: userId,
          receiverId: receiverId,
          content: trimmedMessage,
        };

        const response = await sendMessage(messageData, token);
        console.log('Message sent:', response.data);
        setStatusMessage('Message sent successfully!');
        setMessageToSend('');
        // Refetch messages to update the conversation
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

      const conversationData = {
        userId: userId,
        participantId: participantId,
      };

      const response = await createConversation(conversationData, token);
      setConversations([...conversations, response.data]);
      setSelectedConversationId(response.data._id);
      setDisplayNewChatForm(false);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await deleteConversation(conversationId, token);
      // Update the conversations list after deletion
      setConversations(conversations.filter((convo) => convo._id !== conversationId));
      setSelectedConversationId(null);
      setMessagesInConversation([]);
      setStatusMessage('Conversation deleted successfully.');
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setStatusMessage('Error deleting conversation. Please try again.');
    }
  };

  return (
    <div>
      <ConversationsList
        onSelectConversation={setSelectedConversationId}
        conversations={conversations}
        loading={loadingConversations}
        handleNewChatClick={handleNewChatClick}
        handleDeleteConversation={handleDeleteConversation}
      />
      <NewChatForm
        displayNewChatForm={displayNewChatForm}
        handleCreateNewChat={handleCreateNewChat}
      />
      {selectedConversationId ? (
        <Conversation
          handleMessageSubmit={handleMessageSubmit}
          messagesInConversation={messagesInConversation}
          messageToSend={messageToSend}
          setMessageToSend={setMessageToSend}
          statusMessage={statusMessage}
        />
      ) : (
        <p>Please select a conversation to view messages</p>
      )}
    </div>
  );
};

export default ChatsPage;
