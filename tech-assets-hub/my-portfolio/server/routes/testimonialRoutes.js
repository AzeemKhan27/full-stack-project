import express from 'express';
import {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { uploadMemory } from '../utils/multer.js';

const router = express.Router();

router.post('/create', uploadMemory.single('avatar'), createTestimonial);
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.put('/modify/:id', uploadMemory.single('avatar'), updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;