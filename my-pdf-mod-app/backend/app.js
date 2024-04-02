import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import pdfRoutes from './routes/pdfRoutes.js';
import bodyParser from 'body-parser';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pdf', pdfRoutes);

//SERVER.js file code :

import config from './config.js'; 

const PORT = config.port || 5000;
app.use(bodyParser.json());
const HOST = '0.0.0.0'; // Specify your desired IP address here

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

export default app;