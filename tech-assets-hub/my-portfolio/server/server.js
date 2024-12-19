// server/server.js

import express from 'express';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import cors from 'cors';

//Service/Student :
import notifyRoutes from './routes/notifyRoutes.js';

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

// Services
app.use('/api/services', servicesRoutes);
// Contacts
app.use('/api/contact', contactRoutes);

// Services/Client
app.use('/api/services/client', notifyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ message: 'An unexpected error occurred.' });
});  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
