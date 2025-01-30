// server/routes/instructorRoutes.js
import express from 'express';
import {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from '../controllers/instructorController.js';

import { uploadMemory } from '../utils/multer.js';

const router = express.Router();

router.get('/getAll', getInstructors);
router.get('/getById', getInstructorById);
router.post('/create', uploadMemory.single('image'), createInstructor);
router.put('/update', uploadMemory.single('image'), updateInstructor);
router.delete('/delete', deleteInstructor);

export default router;
