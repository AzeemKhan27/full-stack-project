// server/server.js

import express from 'express';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import cors from 'cors';
const app = express();



// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Use CORS middleware

app.use(cors({

    origin: 'http://localhost:5173' // Allow requests from this origin

}));

// Initialize Express app
// const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
