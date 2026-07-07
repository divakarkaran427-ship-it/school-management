const Teacher = require('../models/teacher.model');

// Saare teachers lo
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Ek teacher lo
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Naya teacher add karo
const createTeacher = async (req, res) => {
  try {
    const { name, email, phone, subject, class: className, address } = req.body;

    const newTeacher = new Teacher({
      name, email, phone,
      subject, class: className, address
    });

    await newTeacher.save();
    res.status(201).json({ message: 'Teacher added successfully', teacher: newTeacher });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Teacher update karo
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher updated successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Teacher delete karo
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};