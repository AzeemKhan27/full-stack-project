import express from 'express';
import {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import upload from '../utils/multer.js';

const router = express.Router();

let imageUploadMiddleware = upload.single('avatar')

router.post('/create', upload.single('avatar'), createTestimonial);
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.put('/modify/:id', upload.single('avatar'), updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
