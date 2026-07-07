const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log('MongoDB Connection Failed:', error);
    process.exit(1); // connection fail ho to server band kar do
  }
};

module.exports = connectDB;