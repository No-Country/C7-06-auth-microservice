const express = require('express');
const petsController = require('../controllers/Pet.js');

// auth middleware
const auth = require('../middlewares/auth.js');

// create router
const router = express.Router();

// get all pets route
router.get('/', petsController.getAllPets);

// get pet by id route
router.get('/:id', petsController.getPetById);

// create pet route
router.post('/create', auth, petsController.createPet);

// update pet route
router.put('/:id/update', auth, petsController.updatePet);

// delete pet route
router.delete('/:id/delete', auth, petsController.deletePet);

// export router
module.exports = router;
