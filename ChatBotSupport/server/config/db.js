import mongoose from 'mongoose';
const MongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
