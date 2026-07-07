const express = require('express');
const router = express.Router();
const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teacher.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

// Sirf admin ye routes access kar sakta hai
router.get('/', verifyToken, getAllTeachers);
router.get('/:id', verifyToken, getTeacherById);
router.post('/', verifyToken, checkRole('admin'), createTeacher);
router.put('/:id', verifyToken, checkRole('admin'), updateTeacher);
router.delete('/:id', verifyToken, checkRole('admin'), deleteTeacher);

module.exports = router;