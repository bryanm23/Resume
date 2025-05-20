import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { query } from '../config/db.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', [
  body('name').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
], async (req, res) => {
  try {
    console.log('Signup request received:', { ...req.body, password: '[REDACTED]' });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    console.log('User created successfully:', { id: user.id, email: user.email });

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    // Send response
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ 
      message: 'Server error during signup',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists(),
], async (req, res) => {
  try {
    console.log('Login request received:', { email: req.body.email });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      console.log('Invalid login attempt - user not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid login attempt - password mismatch:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.cookie('token', token, COOKIE_OPTIONS);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    console.log('User logged in successfully:', { id: user.id, email: user.email });
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user / Clear cookie
// @access  Public
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    ...COOKIE_OPTIONS,
    maxAge: 0
  });
  res.json({ message: 'Logged out successfully' });
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ 
      message: 'Server error while fetching user profile',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router; 