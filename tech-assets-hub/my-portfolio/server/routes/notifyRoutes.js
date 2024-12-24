//server/routes/notifyRoutes.js

import express from 'express';
import { sendClientNotification, sendStudentNotifications } from '../controllers/notifyController.js';

const router = express.Router();

router.post('/client/notify-client', sendClientNotification);

router.post('/student/notify-student', sendStudentNotifications);

export default router;
