const express = require('express');
const authController = require('../controllers/auth.js');

// create router
const router = express.Router();

// signup route
router.post('/signup', authController.signup);

// login route
router.post('/login', authController.login);

// export router
module.exports = router;
