// server/routes/termsOfServiceRoutes.js
import express from 'express';
import { getTermsOfService, createOrUpdateTermsOfService } from '../controllers/termsOfServiceController.js';

const router = express.Router();

router.get('/', getTermsOfService);
router.post('/', createOrUpdateTermsOfService);

export default router;
