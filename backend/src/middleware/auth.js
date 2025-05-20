import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Add user from payload
      req.user = decoded;
      next();
    } catch (err) {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost'
      });
      res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authorization denied' });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    next();
  } catch (err) {
    console.error('Admin middleware error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}; 