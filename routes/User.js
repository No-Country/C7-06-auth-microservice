const express = require('express');
const userController = require('../controllers/User.js');

// auth middleware
const auth = require('../middlewares/auth.js');

// create router
const router = express.Router();

// signup route
router.post('/signup', userController.signup);

// login route
router.post('/login', userController.login);

// get user route
router.get('/', auth, userController.getUser);

// export router
module.exports = router;
