const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  updateAttendance
} = require('../controllers/attendance.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

// Admin — saari attendance dekhe
router.get('/', verifyToken, checkRole('admin'), getAllAttendance);

// Teacher — attendance mark kare
router.post('/', verifyToken, checkRole('admin', 'teacher'), markAttendance);

// Student/Teacher/Admin — ek student ki attendance dekhe
router.get('/student/:studentId', verifyToken, getStudentAttendance);

// Teacher/Admin — attendance update kare
router.put('/:id', verifyToken, checkRole('admin', 'teacher'), updateAttendance);

module.exports = router;