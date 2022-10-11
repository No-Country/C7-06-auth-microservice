const { sequelize, User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// signup route
const signup = (req, res) => {
  // TODO: validate request
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      try {
        const user = await User.create({
          name: req.body.name,
          last_name: req.body.last_name,
          email: req.body.email,
          address: req.body.address,
          phone_number: req.body.phone_number,
          description: req.body.description,
          password: hash,
          avatar: null,
          role: 'user'
        });
        res.status(201).json({
          message: 'User created',
          user
        });
      } catch (error) {
        res.status(500).json({
          status: 'error',
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

// get user route
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.auth.userId
      }
    });
    res.status(200).json({
      message: 'User fetched',
      user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

// export routes
module.exports = {
  signup,
  login,
  getUser
};
