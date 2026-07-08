const express = require('express');
const cors = require('cors');
const app = express();

// CORS fix
app.use(cors({
  origin: ['http://localhost:3000', 'https://school-management-1-by36.onrender.com'],
  credentials: true
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const teacherRoutes = require('./routes/teacher.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const resultRoutes = require('./routes/result.routes');
const noticeRoutes = require('./routes/notice.routes');

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/notices', noticeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'School Management API is running' });
});

module.exports = app;