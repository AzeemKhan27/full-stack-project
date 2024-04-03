import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import pdfRoutes from './routes/pdfRoutes.js';
import config from './config.js';

const PORT = config.port;
const HOST = '0.0.0.0';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pdf', pdfRoutes);

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

export default app;