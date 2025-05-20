import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/db.js';
import { auth } from '../middleware/auth.js';
import rabbitMQService, { EXCHANGES, ROUTING_KEYS } from '../config/rabbitmq.js';

const router = express.Router();

// Get user's resume
router.get('/', auth, async (req, res, next) => {
  try {
    const result = await query(
      'SELECT * FROM resumes WHERE user_id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Update resume
router.put('/', [
  auth,
  body('content').isObject().notEmpty()
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;

    // Publish resume update message
    await rabbitMQService.publishMessage(
      EXCHANGES.RESUME,
      ROUTING_KEYS.RESUME_UPDATE,
      {
        userId: req.user.id,
        resumeData: content
      }
    );

    // Publish notification message
    await rabbitMQService.publishMessage(
      EXCHANGES.RESUME,
      ROUTING_KEYS.RESUME_NOTIFICATION,
      {
        userId: req.user.id,
        type: 'RESUME_UPDATE',
        content: 'Your resume has been updated'
      }
    );

    // Publish user activity message
    await rabbitMQService.publishMessage(
      EXCHANGES.USER,
      ROUTING_KEYS.USER_ACTIVITY,
      {
        userId: req.user.id,
        activity: 'RESUME_UPDATE',
        timestamp: new Date().toISOString()
      }
    );

    res.json({ message: 'Resume update in progress' });
  } catch (error) {
    next(error);
  }
});

// Delete resume
router.delete('/', auth, async (req, res, next) => {
  try {
    const result = await query(
      'DELETE FROM resumes WHERE user_id = $1 RETURNING *',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Publish notification message
    await rabbitMQService.publishMessage(
      EXCHANGES.RESUME,
      ROUTING_KEYS.RESUME_NOTIFICATION,
      {
        userId: req.user.id,
        type: 'RESUME_DELETE',
        content: 'Your resume has been deleted'
      }
    );

    // Publish user activity message
    await rabbitMQService.publishMessage(
      EXCHANGES.USER,
      ROUTING_KEYS.USER_ACTIVITY,
      {
        userId: req.user.id,
        activity: 'RESUME_DELETE',
        timestamp: new Date().toISOString()
      }
    );

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Add experience
router.post('/experience', auth, [
  body('company').notEmpty().trim(),
  body('position').notEmpty().trim(),
  body('startDate').notEmpty(),
  body('endDate').optional(),
  body('description').notEmpty().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, position, startDate, endDate, description } = req.body;
    const result = await query(
      `INSERT INTO experience (resume_id, company, position, start_date, end_date, description)
       VALUES ((SELECT id FROM resume WHERE user_id = $1), $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, company, position, startDate, endDate, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update experience
router.put('/experience/:id', auth, [
  body('company').optional().trim(),
  body('position').optional().trim(),
  body('startDate').optional(),
  body('endDate').optional(),
  body('description').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, position, startDate, endDate, description } = req.body;
    const result = await query(
      `UPDATE experience 
       SET company = COALESCE($1, company),
           position = COALESCE($2, position),
           start_date = COALESCE($3, start_date),
           end_date = COALESCE($4, end_date),
           description = COALESCE($5, description)
       WHERE id = $6 AND resume_id = (SELECT id FROM resume WHERE user_id = $7)
       RETURNING *`,
      [company, position, startDate, endDate, description, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete experience
router.delete('/experience/:id', auth, async (req, res) => {
  try {
    const result = await query(
      `DELETE FROM experience 
       WHERE id = $1 AND resume_id = (SELECT id FROM resume WHERE user_id = $2)
       RETURNING *`,
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json({ message: 'Experience deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Similar routes for education, skills, and certifications...

export default router; 