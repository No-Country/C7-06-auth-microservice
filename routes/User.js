const express = require('express');
const userController = require('../controllers/User.js');

// auth middleware
const auth = require('../middlewares/auth.js');

// create router
const router = express.Router();

// get all users route
router.get('/', userController.getAllUsers);

// get user by id route
router.get('/:id', userController.getUser);

// update user route
router.put('/:id/update', auth, userController.updateUser);

// export router
module.exports = router;
