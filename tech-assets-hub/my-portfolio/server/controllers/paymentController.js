// backend/controllers/paymentController.js
import Razorpay from 'razorpay';
import config from '../config/config.js';
import Course from '../models/Course.js';

const razorpay = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret,
});

const createOrder = async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const options = {
      amount: course.price * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: `order_rcptid_${courseId}`,
    };

    razorpay.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(order);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const attributes = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    };

    const hmac = crypto.createHmac('sha256', config.razorpayKeySecret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      res.json({ status: 'Payment Successful' });
    } else {
      res.status(400).json({ status: 'Payment Failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createOrder, verifyPayment };
