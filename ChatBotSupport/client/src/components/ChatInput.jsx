import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/chatSlice';
import axios from 'axios';

const ChatInput = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch(addMessage({ sender: 'user', text: inputValue }));
      setInputValue('');

      const baseUrl = 'http://localhost:5000'
      try {
        const response = await axios.post(`${baseUrl}/api/chat`, { message: inputValue });
        console.log("RESPONSE :",response);
        dispatch(addMessage({ sender: 'bot', text: response.data.response }));
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;