// server/config/db.js

import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import config from './config.js';

// dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 30000, // Increase timeout to 30 seconds
      
    });
    console.log('MongoDB connected');
    console.log(process.env.MONGODB_URI)
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
