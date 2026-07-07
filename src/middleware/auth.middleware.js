const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // Header se token lo
    const token = req.headers.authorization?.split(' ')[1];
    
    // Token hai ya nahi check karo
    if (!token) {
      return res.status(401).json({ message: 'Access denied, token missing' });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // User ki info request mein add karo
    req.user = decoded;
    
    // Aage jaane do
    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };