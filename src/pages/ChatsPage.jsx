import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getMessages, sendMessage, getUserConversations } from '../api/api';
import ConversationsList from '../components/ConversationsList';
import Conversation from '../components/Conversation';

const ChatsPage = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [messagesInConversation, setMessagesInConversation] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
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

  return (
    <div>
      <ConversationsList
        onSelectConversation={setSelectedConversationId}
        conversations={conversations}
        loading={loadingConversations}
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
