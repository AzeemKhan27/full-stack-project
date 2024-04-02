// routes/pdfRoutes.js
import express from 'express';
import multer from 'multer';
import { modifyPdf } from '../controllers/pdfController.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'backend/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.pdf`);
    },
  });
  
  const upload = multer({ storage });
  
  router.put('/modify-pdf', upload.single('pdf'), modifyPdf);

export default router;
