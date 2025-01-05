// server/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import notifyRoutes from './routes/notifyRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import multer from 'multer';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from this origin
}));

// Middleware
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form-data

// Multer middleware for parsing multipart/form-data
const upload = multer();

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/team-members', teamRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services/notifications', upload.none(), notifyRoutes);
app.use('/api/services/students/courses', courseRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ message: 'An unexpected error occurred.' });
});

export default app;
