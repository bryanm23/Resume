import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/db.js';

const router = express.Router();

// Submit contact form
router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim(),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // Store message in database
    const result = await query(
      `INSERT INTO contact_messages (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );

    // Log the message (as requested)
    console.log('New contact message:', {
      id: result.rows[0].id,
      name,
      email,
      message,
      timestamp: result.rows[0].created_at
    });

    res.status(201).json({
      message: 'Message sent successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

// Get all messages (protected route - to be used with admin panel)
router.get('/', async (req, res, next) => {
  try {
    const messages = await query(
      `SELECT * FROM contact_messages 
       ORDER BY created_at DESC`
    );

    res.json(messages.rows);
  } catch (error) {
    next(error);
  }
});

export default router; 