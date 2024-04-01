import express from 'express';
import chatController from '../controllers/chatController';

const router = express.Router();

router.post('/chat', chatController.handleMessage);
router.get('/chat', chatController.getMessages);

export default router;