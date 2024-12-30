//server/routes/notifyRoutes.js

import express from 'express';
import { 
        sendClientNotification, 
        sendStudentNotifications, 
        sendJoinerNotification 
       } from '../controllers/notifyController.js';

const router = express.Router();

router.post('/client/notify-client', sendClientNotification);

router.post('/student/notify-student', sendStudentNotifications);

router.post('/about-joiner-request', sendJoinerNotification)

export default router;
