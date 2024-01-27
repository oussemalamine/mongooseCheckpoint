const express = require('express');
const router = express.Router();
const Person = require('../models/personModel');

// GET all people
router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.json(people);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST a new person
router.post('/', async (req, res) => {
  try {
      const { name, age, favoriteFoods } = req.body;

      // Validate required fields
      if (!name) {
          return res.status(400).json({ error: 'Name is required' });
      }

      // Create a new person
      const newPerson = new Person({
          name,
          age,
          favoriteFoods
      });

      // Save the person to the database
      const savedPerson = await newPerson.save();

      res.status(201).json(savedPerson);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a person by ID
router.delete('/:personId', async (req, res) => {
  try {
      const personId = req.params.personId;

      // Validate if personId is provided
      if (!personId) {
          return res.status(400).json({ error: 'Person ID is required' });
      }

      // Find and delete the person by ID
      const deletedPerson = await Person.findByIdAndDelete(personId);

      // Check if the person was found and deleted
      if (!deletedPerson) {
          return res.status(404).json({ error: 'Person not found' });
      }

      res.json(deletedPerson);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (update) a person by ID
router.put('/:personId', async (req, res) => {
  try {
      const personId = req.params.personId;
      const { name, age, favoriteFoods } = req.body;

      // Validate if personId is provided
      if (!personId) {
          return res.status(400).json({ error: 'Person ID is required' });
      }

      // Find and update the person by ID
      const updatedPerson = await Person.findByIdAndUpdate(
          personId,
          { name, age, favoriteFoods },
          { new: true, runValidators: true }
      );

      // Check if the person was found and updated
      if (!updatedPerson) {
          return res.status(404).json({ error: 'Person not found' });
      }

      res.json(updatedPerson);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
