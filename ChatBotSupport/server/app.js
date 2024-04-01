const express = require('express');
const app = express();
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors'); // Import the cors middleware

// MongoDB connection
mongoose.connect('mongodb://localhost/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error', err));

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use('/api', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));