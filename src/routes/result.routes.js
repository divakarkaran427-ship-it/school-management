const express = require('express');
const router = express.Router();
const {
  addResult,
  getAllResults,
  getStudentResults,
  updateResult,
  deleteResult
} = require('../controllers/result.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

// Admin — saare results dekhe
router.get('/', verifyToken, checkRole('admin'), getAllResults);

// Teacher/Admin — result add kare
router.post('/', verifyToken, checkRole('admin', 'teacher'), addResult);

// Student/Teacher/Admin — ek student ke results dekhe
router.get('/student/:studentId', verifyToken, getStudentResults);

// Teacher/Admin — result update kare
router.put('/:id', verifyToken, checkRole('admin', 'teacher'), updateResult);

// Admin — result delete kare
router.delete('/:id', verifyToken, checkRole('admin'), deleteResult);

module.exports = router;