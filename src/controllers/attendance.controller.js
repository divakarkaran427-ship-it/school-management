const Attendance = require('../models/attendance.model');

// Attendance mark karo (Teacher karega)
const markAttendance = async (req, res) => {
  try {
    const { student, teacher, class: className, date, status } = req.body;

    // Same student ki same date pe attendance pehle se hai?
    const existing = await Attendance.findOne({ student, date });
    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked for this date' });
    }

    const attendance = new Attendance({
      student, teacher,
      class: className,
      date, status
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully', attendance });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Saari attendance dekho (Admin)
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate('student', 'name rollNumber') // student ka name aur roll number
      .populate('teacher', 'name subject');   // teacher ka name aur subject
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Ek student ki attendance dekho
const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId })
      .populate('student', 'name rollNumber')
      .populate('teacher', 'name subject');

    if (!attendance.length) {
      return res.status(404).json({ message: 'No attendance found for this student' });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Attendance update karo
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.status(200).json({ message: 'Attendance updated successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  markAttendance,
  getAllAttendance,
  getStudentAttendance,
  updateAttendance
};