import express from 'express';
import { sendClientNotification } from '../controllers/notifyController.js';

const router = express.Router();

router.post('/notify-client', sendClientNotification);

export default router;
