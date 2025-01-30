// server/routes/englishPracticeRoutes.js
import express from 'express';
import { registerForEnglishPractice, updatePaymentStatus} from '../controllers/englishPracticeController.js';

const router = express.Router();

router.post('/register', registerForEnglishPractice);

router.patch('/registrations/:id/payment', updatePaymentStatus);

export default router;