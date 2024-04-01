const axios = require('axios');

const generateBotResponse = async (userMessage) => {
  const patterns = [
    { pattern: /^hi|hello|hey$/i, response: 'Hello there!' },
    { pattern: /^how are you?$/i, response: 'I\'m doing well, thank you for asking!' },
    { pattern: /^what is your name?$/i, response: 'My name is ChatBot.' },
  ];

  const matchedPattern = patterns.find((pattern) => pattern.pattern.test(userMessage));
  if (matchedPattern) {
    return matchedPattern.response;
  } else {
    // If no pattern matches, submit user suggestion to external API
    const response = await submitUserSuggestion(userMessage);
    return response.data.message;
  }
};

const submitUserSuggestion = async (userMessage) => {
  try {
    const response = await axios.post('https://example.com/api/suggestions', { message: userMessage });
    return response;
  } catch (error) {
    console.error('Error submitting user suggestion:', error);
    throw new Error('Failed to submit user suggestion');
  }
};

module.exports = { generateBotResponse, submitUserSuggestion };
