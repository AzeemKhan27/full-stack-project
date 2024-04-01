const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/chat', chatController.handleMessage);
router.get('/chat', chatController.getMessages);

module.exports = router;