// server/server.js

import express from 'express';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import servicesRoutes from './routes/servicesRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import cors from 'cors';

//Service/Student :
import notifyRoutes from './routes/notifyRoutes.js';

//About Page : Team Members
import teamRoutes from './routes/teamRoutes.js';

//Testimonial
import testimonialRoutes from './routes/testimonialRoutes.js'; // Import the new route


import multer from 'multer';

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
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form-data

// Multer middleware for parsing multipart/form-data
const upload = multer();

// Meet My Team Api
app.use('/api/team-members', teamRoutes);

// Services
app.use('/api/services', servicesRoutes);
// Contacts
app.use('/api/contact', contactRoutes);

// Services/Notification/Client And Student
app.use('/api/services/notifications', upload.none(), notifyRoutes);

// Services/Students/Course

app.use('/api/services/students/courses', courseRoutes);

// Testimonials
app.use('/api/testimonials', testimonialRoutes); // Add the new route

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ message: 'An unexpected error occurred.' });
});  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
