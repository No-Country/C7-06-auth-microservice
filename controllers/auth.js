const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// signup route
const signup = (req, res) => {
  // TODO: validate request
  console.log("body",  req.body);
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      try {
        const user = await User.create({
          address: req.body.address,
          description: req.body.description,
          email: req.body.email,
          password: hash,
          name: req.body.name,
          phone_number: req.body.phone_number,
          surname: req.body.surname,
          role: 'user'
        });
        const newUser = await User.findOne({
          where: {
            email: req.body.email
          }
        });
        if (newUser) {
          const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_KEY, {
            expiresIn: '24h'
          });
          return res.status(200).json({
            message: 'Auth successful',
            id: newUser.id,
            role: newUser.role,
            token
          });
        }
      } catch (error) {
        res.status(500).json({
          status: 'error:' + error,
          message: 'Internal server error'
        });
      }
    }
  });
};

// login route
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_KEY, {
            expiresIn: '24h'
          });

          return res.status(200).json({
            message: 'Auth successful',
            id: user.id,
            role: user.role,
            token
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        });
      });
    } else {
      res.status(401).json({
        message: 'Auth failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

// login with google route
const google = async (req, res) => {
  try {
    const { token } = req.body;
    const decode = jwt.decode(token);
    const user = await User.findOne({
      where: {
        email: decode.email
      }
    });
    if (user) {
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_KEY, {
        expiresIn: '24h'
      });
      return res.status(200).json({
        message: 'Auth successful',
        id: user.id,
        role: user.role,
        token
      });
    } else {
      const newUser = await User.create({
        email: decode.email,
        name: decode.given_name,
        surname: decode.family_name,
        role: 'user'
      });
      const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_KEY, {
        expiresIn: '24h'
      });
      return res.status(200).json({
        message: 'Auth successful',
        id: newUser.id,
        role: newUser.role,
        token
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error //'Internal server error'
    });
  }
};

// export routes
module.exports = {
  signup,
  login,
  google
};
