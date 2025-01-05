//server/config/config.js

import dotenv from 'dotenv';

dotenv.config();

const config = {
  razorpayKeyId: process.env.RAZORPAY_KEY,
  razorpayKeySecret: process.env.RAZORPAY_SECRET,
};

export default config;