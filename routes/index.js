const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const { connectDB, ping } = require('../util/db');
const { sequelize, User, Pet } = require('../models');

// routes imports
const authRoutes = require('./auth');
const userRoutes = require('./User');
const petRoutes = require('./Pet');

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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);

// ping route for testing
app.get('/api/ping', ping);

module.exports = app;
