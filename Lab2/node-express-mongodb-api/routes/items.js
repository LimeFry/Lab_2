const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Create a new item

/**
 * @swagger
 * components:
 *  schemas:
 *    items:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The user's name
 *        description:
 *          type: string
 *          description: Description of user
 */

/**
 * @swagger
 * /items:
 *  post:
 *    summary: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/items'
 *    responses:
 *      201:
 *        description: User created
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
 * /items:
 *  get:
 *    summary: Retrieve a list of users
 *    responses:
 *      200:
 *        description: A list of users
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
 * /items:
 *  patch:
 *    summary: Update user
 *    responses:
 *      200:
 *        description: Update user
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
 * /items:
 *  delete:
 *    summary: Delete a user
 *    responses:
 *      200:
 *        description: Delete user
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