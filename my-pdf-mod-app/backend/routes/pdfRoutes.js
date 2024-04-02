// routes/pdfRoutes.js
import express from 'express';
import multer from 'multer';
import { modifyPdf } from '../controllers/pdfController.js';

const router = express.Router();
const upload = multer({ dest: './uploads' });

router.post('/modify-pdf', upload.single('pdf'), modifyPdf);

export default router;
