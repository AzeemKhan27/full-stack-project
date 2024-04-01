import React from 'react';
import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';

const ChatWindow = () => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <ChatMessage key={index} sender={message.sender} text={message.text} />
      ))}
    </div>
  );
};

export default ChatWindow;