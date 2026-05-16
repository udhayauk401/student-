const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Routes
router.get('/', getStudents);           // Get all students with search/filter
router.get('/:id', getStudent);         // Get single student
router.post('/', createStudent);        // Create new student
router.put('/:id', updateStudent);      // Update student
router.delete('/:id', deleteStudent);   // Delete student

module.exports = router;