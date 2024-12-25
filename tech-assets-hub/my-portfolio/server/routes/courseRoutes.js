const express = require('express');
const multer = require('multer');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary file storage

router.post('/', upload.single('image'), createCourse); // Create a new course
router.get('/', getCourses); // Fetch all courses
router.get('/:id', getCourseById); // Fetch a course by ID
router.put('/:id', updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course

module.exports = router;
