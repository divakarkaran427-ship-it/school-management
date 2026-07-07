const express = require('express');
const router = express.Router();
const {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice
} = require('../controllers/notice.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const checkRole = require('../middleware/role.middleware');

// Sabko notices dekhne ka access
router.get('/', verifyToken, getAllNotices);

// Sirf admin notice create/update/delete kar sakta hai
router.post('/', verifyToken, checkRole('admin'), createNotice);
router.put('/:id', verifyToken, checkRole('admin'), updateNotice);
router.delete('/:id', verifyToken, checkRole('admin'), deleteNotice);

module.exports = router;