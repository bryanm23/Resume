import express from 'express';
import { query } from '../config/db.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Apply admin middleware to all routes
router.use(adminMiddleware);

// Get dashboard stats
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await query(`
      SELECT
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COUNT(*) FROM contact_messages) as total_messages,
        (SELECT COUNT(*) FROM projects WHERE featured = true) as featured_projects,
        (SELECT COUNT(*) FROM users) as total_users
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Get recent activities
router.get('/activities', async (req, res, next) => {
  try {
    const activities = await query(`
      SELECT 'project' as type, title as name, created_at, 'created' as action
      FROM projects
      WHERE created_at > NOW() - INTERVAL '7 days'
      UNION ALL
      SELECT 'message' as type, name, created_at, 'received' as action
      FROM contact_messages
      WHERE created_at > NOW() - INTERVAL '7 days'
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json(activities.rows);
  } catch (error) {
    next(error);
  }
});

// Get all contact messages
router.get('/messages', async (req, res, next) => {
  try {
    const messages = await query(`
      SELECT * FROM contact_messages
      ORDER BY created_at DESC
    `);

    res.json(messages.rows);
  } catch (error) {
    next(error);
  }
});

// Mark message as read
router.put('/messages/:id/read', async (req, res, next) => {
  try {
    const result = await query(
      `UPDATE contact_messages
       SET read = true
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Delete message
router.delete('/messages/:id', async (req, res, next) => {
  try {
    const result = await query(
      'DELETE FROM contact_messages WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 