import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import chatRoutes from './routes/chatRoutes.js';
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
