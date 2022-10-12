const jwt = require('jsonwebtoken');

// config environment variables
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { userId, role } = jwt.verify(token, process.env.JWT_KEY);
    req.auth = { userId, role };
    console.log(rep.params.id);
    console.log(req.auth.userId);
    // req.auth.userId = userId;
    // req.auth.role = role;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed XXXXX'
    });
  }
};
