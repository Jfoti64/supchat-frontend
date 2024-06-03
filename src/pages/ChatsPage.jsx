import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
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
        console.error('Error fetching conversations:', error);
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations();
  }, [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token || !selectedConversationId) {
        return;
      }

      try {
        const messages = await getMessages(selectedConversationId, token);
        setMessagesInConversation(messages.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedConversationId, token]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const trimmedMessage = messageToSend.trim();
      if (trimmedMessage) {
        await sendMessage({ text: trimmedMessage }, token);
        setStatusMessage('Message sent successfully!');
        setMessageToSend('');
        // Refetch messages to update the conversation
        const messages = await getMessages(selectedConversationId, token);
        setMessagesInConversation(messages.data);
      }
    } catch (error) {
      console.error('Message failed', error);
      setStatusMessage('Message failed. Please try again.');
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
