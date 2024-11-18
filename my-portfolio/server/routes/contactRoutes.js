// routes/contactRoutes.js
import express from 'express';
import contactController from '../controllers/contactController.js';

const router = express.Router();

router.post('/', contactController.createContact);

export default router;