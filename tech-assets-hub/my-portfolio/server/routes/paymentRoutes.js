// backend/routes/paymentRoutes.js
import express from 'express';
import { createOrder, verifyPayment, checkEnrollment  } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/check-enrollment', checkEnrollment); // Add this route

export default router;
