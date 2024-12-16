import express from 'express';
import servicesController from '../controllers/servicesController.js';

const router = express.Router();

router.post('/', servicesController.createService);

export default router;
