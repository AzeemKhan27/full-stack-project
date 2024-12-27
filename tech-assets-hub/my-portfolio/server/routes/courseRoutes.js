import express from 'express';
import upload from '../utils/multer.js';
import  {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  searchCoursesByTitle 
} from '../controllers/courseController.js';

const router = express.Router();

const uploadMiddleware = upload.fields([
  { name: 'instructor_image', maxCount: 1 }, 
  { name: 'course_banner_image', maxCount: 1 },
  { name: 'instructor_image_2', maxCount: 1 },
])

router.post('/', 
  uploadMiddleware, createCourse); // Create a new course

// Route for searching courses
router.get('/search', searchCoursesByTitle);

router.get('/', getCourses); // Fetch all courses
router.get('/:id', getCourseById); // Fetch a course by ID
router.put('/update', uploadMiddleware, updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course

export default router;
