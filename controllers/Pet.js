const { sequelize, Pet } = require('../models');
require('dotenv').config();

// get all pets route
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json({
      message: 'Pets fetched',
      pets
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

// get pet by id route
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id
      }
    });
    if (pet) {
      res.status(200).json({
        message: 'Pet fetched',
        pet
      });
    } else {
      res.status(404).json({
        message: 'Pet not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

// create pet route
const createPet = async (req, res) => {
  try {
    const pet = await Pet.create({
      age: req.body.age,
      animal_type: req.body.animal_type,
      description: req.body.description,
      gender: req.body.gender,
      pure_race: req.body.pure_race,
      race: req.body.breed,
      size: req.body.size,
      vaccinations_up_to_date: req.body.vaccinations_up_to_date,
      name: req.body.name,
      weight: req.body.weight,
      user_id: req.auth.userId
    });
    res.status(201).json({
      message: 'Pet created',
      pet
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

// update pet route
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id
      }
    });
    if (pet) {
      const updatedPet = await pet.update({
        age: req.body.age,
        animal_type: req.body.animal_type,
        description: req.body.description,
        gender: req.body.gender,
        pure_race: req.body.pure_race,
        race: req.body.breed,
        size: req.body.size,
        vaccinations_up_to_date: req.body.vaccinations_up_to_date,
        name: req.body.name,
        weight: req.body.weight
      });
      res.status(200).json({
        message: 'Pet updated',
        pet: updatedPet
      });
    } else {
      res.status(404).json({
        message: 'Pet not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

// delete pet route
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id
      }
    });
    if (pet) {
      await pet.destroy();
      res.status(200).json({
        message: 'Pet deleted'
      });
    } else {
      res.status(404).json({
        message: 'Pet not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

module.exports = {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
};