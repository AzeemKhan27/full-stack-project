import express from 'express';
import upload from '../utils/multer.js';
import  {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';

const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Temporary file storage

router.post('/', upload.single('image'), createCourse); // Create a new course
router.get('/', getCourses); // Fetch all courses
router.get('/:id', getCourseById); // Fetch a course by ID
router.put('/:id', updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course

export default router;
