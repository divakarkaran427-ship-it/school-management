const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'], // sirf ye teen values allowed hain
    required: true
  }
}, { timestamps: true }); // createdAt, updatedAt automatically add hoga

module.exports = mongoose.model('User', userSchema);