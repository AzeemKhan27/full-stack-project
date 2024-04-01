const generateResponse = async (message) => {
  // Simple greeting logic
  const lowercaseMessage = message.toLowerCase();
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    return 'Hello there! How can I assist you today?';
  }

  // Default response if no specific logic matches
  return `I'm sorry, I didn't understand your message: "${message}". Could you please rephrase your query?`;
};

module.exports = {
  generateResponse,
};