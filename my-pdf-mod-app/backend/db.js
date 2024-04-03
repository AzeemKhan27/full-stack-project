import mongoose from 'mongoose';
import config from './config.js'; 

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI,{
      useUnifiedTopology: true,
      useNewUrlParser: true});
    console.log('MongoDB connected : ', config.mongoURI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;