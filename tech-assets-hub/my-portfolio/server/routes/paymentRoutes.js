// backend/routes/paymentRoutes.js
import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', paymentController.createOrder);

export default router;
