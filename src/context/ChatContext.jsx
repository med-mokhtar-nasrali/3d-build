import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [quickReplies, setQuickReplies] = useState([]);

  // Load quick replies on mount
  useEffect(() => {
    fetch('http://localhost:3001/api/quick-replies')
      .then(res => res.json())
      .then(data => setQuickReplies(data))
      .catch(err => console.error('Failed to load quick replies:', err));
  }, []);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        type: 'bot',
        content: "Hi there! 👋 I'm Aria, your friendly real estate assistant! I'm here to help you find your perfect home. What can I help you with today?",
        timestamp: new Date().toISOString(),
        animated: true
      }]);
    }
  }, [messages.length]);

  const sendMessage = useCallback(async (content, type = 'user') => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to backend
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'bot',
        content: data.response,
        timestamp: data.timestamp,
        suggestedHouses: data.suggestedHouses,
        animated: true
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: `msg_${Date.now()}_error`,
        type: 'bot',
        content: "Oops! 😅 I'm having trouble connecting right now. Please make sure the chatbot server is running and try again!",
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const clearConversation = useCallback(async () => {
    try {
      await fetch('http://localhost:3001/api/reset-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId })
      });
    } catch (error) {
      console.error('Error resetting conversation:', error);
    }

    setMessages([{
      id: 'welcome',
      type: 'bot',
      content: "Hi there! 👋 I'm Aria, your friendly real estate assistant! I'm here to help you find your perfect home. What can I help you with today?",
      timestamp: new Date().toISOString(),
      animated: true
    }]);
  }, [sessionId]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        quickReplies,
        sendMessage,
        clearConversation,
        toggleChat,
        sessionId
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};


