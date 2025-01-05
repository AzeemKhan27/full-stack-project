import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    razorpayKeyId: process.env.RAZORPAY_KEY,
    razorpayKeySecret: process.env.RAZORPAY_SECRET,
  };
  