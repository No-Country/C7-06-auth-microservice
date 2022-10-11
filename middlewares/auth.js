const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// config environment variables
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.userId;
    const role = decoded.role;
    req.auth = { userId, role };
    if ((req.body.userId && req.body.userId !== userId) || role !== 'admin') {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
