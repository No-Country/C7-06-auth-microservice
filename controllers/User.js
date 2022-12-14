const { sequelize, User } = require('../models');
const bcrypt = require('bcrypt');

// get all users route
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      message: 'Users fetched',
      users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

// update user route
const updateUser = async (req, res) => {
  const paramsId = parseInt(req.params.id);
  if (req.auth.userId !== paramsId) {
    return res.status(401).json({
      message: 'Auth failed.'
    });
  }

  try {
    const user = await User.findOne({
      where: {
        id: paramsId
      }
    });
    if (user) {
      const updatedUser = await user.update({
        address: req.body.address,
        description: req.body.description,
        email: req.body.email,
        name: req.body.name,
        phone_number: req.body.phone_number,
        surname: req.body.surname
      });
      res.status(200).json({
        message: 'User updated',
        user: updatedUser
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

// delete user route
const deleteUser = async (req, res) => {
  const paramsId = parseInt(req.params.id);
  if (req.auth.userId !== paramsId) {
    return res.status(401).json({
      message: 'Auth failed.'
    });
  }
  try {
    const user = await User.findOne({
      where: {
        id: paramsId
      }
    });
    if (user) {
      await user.destroy();
      res.status(200).json({
        message: 'User deleted'
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

// update user password route
const updateUserPassword = async (req, res) => {
  const paramsId = parseInt(req.params.id);
  if (req.auth.userId != paramsId) {
    return res.status(401).json({
      message: 'Auth failed.'
    });
  }
  try {
    const user = await User.findOne({
      where: {
        id: paramsId
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
          bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              try {
                const updatedUser = await user.update({ password: hash });
                res.status(200).json({
                  message: 'User password updated',
                  user: updatedUser
                });
              } catch (error) {
                res.status(500).json({
                  status: 'error' + error,
                  message: 'Internal server error'
                });
              }
            }
          });
        }
      });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error' + error,
      message: 'Internal server error'
    });
  }
};

// get user route
const getUser = async (req, res) => {
  const paramsId = parseInt(req.params.id);
  try {
    const user = await User.findOne({
      where: {
        id: paramsId
      }
    });
    res.status(200).json({
      message: 'User fetched',
      user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error' + error,
      message: 'Internal server error'
    });
  }
};

// export routes
module.exports = {
  updateUser,
  updateUserPassword,
  getAllUsers,
  deleteUser,
  getUser
};
