const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const { connectDB, ping } = require('../util/db');
const { sequelize, User } = require('../models');

// routes imports
const userRoutes = require('./User');

// config environment variables
dotenv.config();

// innitialize express
const app = express();

// log requests
app.use(logger('dev'));

// database connection
connectDB();

// express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors());

// routes
app.use('/api/auth', userRoutes);

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      message: 'Users fetched',
      users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// ping route for testing
app.get('/api/ping', ping);

module.exports = app;
