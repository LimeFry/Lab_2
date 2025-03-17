const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create a new item

/**
    * @swagger
    * /post:
    *   get:
    *     summary: Add an item to the database
    *     parameters:
    *       - in: path
    *         name: name
    *         schema:
    *           type: string
    *         required: true
    *     requests:
    *       1:
    *         description: Calling the function requires an item name
    *     responses:
    *       1:
    *         description: Nothing means success
    *       2:
    *         description: err.message means it was unsuccessful in adding the item
    */

router.post('/', async (req, res) => {
  try {
    await new Promise ((resolve) => setTimeout(resolve , 5000));
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items

/**
    * @swagger
    * /get:
    *   get:
    *     summary: Get all items from the database
    *     requests:
    *       1:
    *         description: Calling the function requires no arguments
    *     responses:
    *       1:
    *         description: The requested items
    *       2:
    *         description: err.message means it was unsuccessful in getting the items
    */

router.get('/', async (req, res) => {
  try {
    await new Promise ((resolve) => setTimeout(resolve , 5000));
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an item

/**
    * @swagger
    * /patch:
    *   get:
    *     summary: Change an item in the database
    *     parameters:
    *       - in: path
    *         name: name
    *         schema:
    *           type: string
    *         required: true
    *     requests:
    *       1:
    *         description: Calling the function requires an item name
    *     responses:
    *       1:
    *         description: Nothing means success
    *       2:
    *         description: err.message means it was unsuccessful in modifying the item
    */

router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item

/**
    * @swagger
    * /delete:
    *   get:
    *     summary: Delete an item in the database
    *     parameters:
    *       - in: path
    *         name: name
    *         schema:
    *           type: string
    *         required: true
    *     requests:
    *       1:
    *         description: Calling the function requires an item name
    *     responses:
    *       1:
    *         description: Nothing means success
    *       2:
    *         description: err.message means it was unsuccessful in deleting the item
    */

router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;