const Result = require('../models/result.model');

// Grade calculate karne ka function
const calculateGrade = (marks, totalMarks) => {
  const percentage = (marks / totalMarks) * 100;
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
};

// Result add karo (Teacher karega)
const addResult = async (req, res) => {
  try {
    const { student, teacher, subject, class: className, exam, marks, totalMarks } = req.body;

    // Grade automatically calculate hogi
    const grade = calculateGrade(marks, totalMarks);

    const result = new Result({
      student, teacher,
      subject, class: className,
      exam, marks, totalMarks, grade
    });

    await result.save();
    res.status(201).json({ message: 'Result added successfully', result });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Saare results dekho (Admin)
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'name rollNumber')
      .populate('teacher', 'name subject');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Ek student ke saare results dekho
const getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.studentId })
      .populate('student', 'name rollNumber')
      .populate('teacher', 'name subject');

    if (!results.length) {
      return res.status(404).json({ message: 'No results found for this student' });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Result update karo
const updateResult = async (req, res) => {
  try {
    // Agar marks update ho rahe hain to grade bhi recalculate karo
    if (req.body.marks && req.body.totalMarks) {
      req.body.grade = calculateGrade(req.body.marks, req.body.totalMarks);
    }

    const result = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.status(200).json({ message: 'Result updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Result delete karo
const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  addResult,
  getAllResults,
  getStudentResults,
  updateResult,
  deleteResult
};