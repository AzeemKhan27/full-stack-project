// server/server.js
import app from './app.js';

// Start server
const PORT = process.env.PORT || 5000;
console.log('Starting 1',PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
