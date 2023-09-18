const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const { generateCrudMethods } = require('../services/index.js');
const userCrud = generateCrudMethods(User);
const { validateDbId } = require('../middlewares/index.js');

// Error handler for user not found
const userNotFound = (req, res, next) => {
  res
    .status(404)
    .json({ error: `No record with given _id : (${req.params.id})` });
};

// Create a new user
router.post('/', async (req, res, next) => {
  try {
    const createdUser = await userCrud.create(req.body);
    if (createdUser) {
      res.status(201).json(createdUser);
    } else {
      res.status(400).json({ error: 'Failed to create user.' });
    }
  } catch (err) {
    next(err);
  }
});

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const data = await userCrud.getAll();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

// GET user by ID
router.get('/:id', validateDbId, async (req, res, next) => {
  try {
    const data = await userCrud.getById(req.params.id);
    if (data) {
      res.send(data);
    } else {
      userNotFound(req, res);
    }
  } catch (err) {
    next(err);
  }
});

// Update user by ID
router.put('/:id', validateDbId, async (req, res, next) => {
  try {
    const data = await userCrud.update(req.params.id, req.body);
    if (data) {
      res.send(data);
    } else {
      userNotFound(req, res);
    }
  } catch (err) {
    next(err);
  }
});

// Delete user by ID
router.delete('/:id', validateDbId, async (req, res, next) => {
  try {
    const data = await userCrud.delete(req.params.id);
    if (data) {
      res.send(data);
    } else {
      userNotFound(req, res);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
