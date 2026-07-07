const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/student.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

// Sirf admin ye routes access kar sakta hai
router.get('/', verifyToken, getAllStudents);
router.get('/:id', verifyToken, getStudentById);
router.post('/', verifyToken, checkRole('admin'), createStudent);
router.put('/:id', verifyToken, checkRole('admin'), updateStudent);
router.delete('/:id', verifyToken, checkRole('admin'), deleteStudent);

module.exports = router;