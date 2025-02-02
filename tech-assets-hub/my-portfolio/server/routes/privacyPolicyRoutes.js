// server/routes/privacyPolicyRoutes.js
import express from 'express';

import { getPrivacyPolicy, createOrUpdatePrivacyPolicy } from '../controllers/privacyPolicyController.js';

const router = express.Router();

router.get('/', getPrivacyPolicy);
router.post('/', createOrUpdatePrivacyPolicy);

export default router;
