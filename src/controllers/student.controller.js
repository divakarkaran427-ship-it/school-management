const Student = require('../models/student.model');

// Saare students lo
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Ek student lo (ID se)
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Naya student add karo
const createStudent = async (req, res) => {
  try {
    const {
      name, email, rollNumber,
      class: className, section,
      parentName, parentPhone, address
    } = req.body;

    // Roll number already exist karta hai?
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    const newStudent = new Student({
      name, email, rollNumber,
      class: className, section,
      parentName, parentPhone, address
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', student: newStudent });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Student update karo
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // updated data wapas bhejo
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Student delete karo
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};