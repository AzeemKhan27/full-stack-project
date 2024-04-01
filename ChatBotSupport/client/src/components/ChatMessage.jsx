import React from 'react';

const ChatMessage = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <span>{text}</span>
    </div>
  );
};

export default ChatMessage;