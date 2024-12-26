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
// const upload = multer({ dest: 'uploads/' }); // Temporary file storage

router.post('/', upload.fields([{ name: 'instructor_image', maxCount: 1 }, { name: 'course_banner_image', maxCount: 1 }]), createCourse); // Create a new course

// Route for searching courses
router.get('/search', searchCoursesByTitle);

router.get('/', getCourses); // Fetch all courses
router.get('/:id', getCourseById); // Fetch a course by ID
router.put('/:id', updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course

export default router;
