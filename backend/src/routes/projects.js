import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/db.js';
import { auth } from '../middleware/auth.js';
import pool from '../db/pool.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await query(`
      SELECT p.*, 
             array_agg(t.name) as technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      GROUP BY p.id
      ORDER BY p.featured DESC, p.created_at DESC
    `);

    res.json(projects.rows);
  } catch (error) {
    next(error);
  }
});

// Get featured projects
router.get('/featured', async (req, res, next) => {
  try {
    const projects = await query(`
      SELECT p.*, 
             array_agg(t.name) as technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      WHERE p.featured = true
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);

    res.json(projects.rows);
  } catch (error) {
    next(error);
  }
});

// Create project (protected route)
router.post('/', auth, [
  body('title').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('githubUrl').optional().isURL(),
  body('liveUrl').optional().isURL(),
  body('technologies').isArray(),
  body('featured').optional().isBoolean(),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, githubUrl, liveUrl, technologies, featured } = req.body;

    // Start transaction
    const client = await query.getClient();
    try {
      await client.query('BEGIN');

      // Insert project
      const projectResult = await client.query(
        `INSERT INTO projects (title, description, github_url, live_url, featured, user_id)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [title, description, githubUrl, liveUrl, featured, req.user.userId]
      );

      // Insert technologies
      if (technologies && technologies.length > 0) {
        for (const tech of technologies) {
          // Insert or get technology
          const techResult = await client.query(
            `INSERT INTO technologies (name)
             VALUES ($1)
             ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
             RETURNING id`,
            [tech]
          );

          // Link technology to project
          await client.query(
            `INSERT INTO project_technologies (project_id, technology_id)
             VALUES ($1, $2)`,
            [projectResult.rows[0].id, techResult.rows[0].id]
          );
        }
      }

      await client.query('COMMIT');
      res.status(201).json(projectResult.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
});

// Update project (protected route)
router.put('/:id', auth, [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('githubUrl').optional().isURL(),
  body('liveUrl').optional().isURL(),
  body('technologies').optional().isArray(),
  body('featured').optional().isBoolean(),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, githubUrl, liveUrl, technologies, featured } = req.body;
    const projectId = req.params.id;

    // Start transaction
    const client = await query.getClient();
    try {
      await client.query('BEGIN');

      // Update project
      const projectResult = await client.query(
        `UPDATE projects 
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             github_url = COALESCE($3, github_url),
             live_url = COALESCE($4, live_url),
             featured = COALESCE($5, featured)
         WHERE id = $6 AND user_id = $7
         RETURNING *`,
        [title, description, githubUrl, liveUrl, featured, projectId, req.user.userId]
      );

      if (projectResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ message: 'Project not found' });
      }

      // Update technologies if provided
      if (technologies) {
        // Remove existing technology links
        await client.query(
          'DELETE FROM project_technologies WHERE project_id = $1',
          [projectId]
        );

        // Add new technologies
        for (const tech of technologies) {
          const techResult = await client.query(
            `INSERT INTO technologies (name)
             VALUES ($1)
             ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
             RETURNING id`,
            [tech]
          );

          await client.query(
            `INSERT INTO project_technologies (project_id, technology_id)
             VALUES ($1, $2)`,
            [projectId, techResult.rows[0].id]
          );
        }
      }

      await client.query('COMMIT');
      res.json(projectResult.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
});

// Delete project (protected route)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const result = await query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 