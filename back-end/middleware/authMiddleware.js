// File: middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createAuthError, createNotFoundError } = require('./errorHandler');

/**
 * Middleware to protect routes that require authentication
 */
exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return next(createAuthError('Access denied. No token provided'));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by id and attach to req object
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return next(createNotFoundError('User no longer exists'));
      }
      
      // Check if token issued before password change
      if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
        return next(createAuthError('User recently changed password. Please log in again'));
      }
      
      req.user = user;
      next();
    } catch (error) {
      return next(createAuthError('Invalid token'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to restrict access based on user role
 * @param {...string} roles - Allowed roles
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createAuthError('Authentication required for this action'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(createForbiddenError(`User role '${req.user.role}' is not authorized to access this route`));
    }
    
    next();
  };
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.isAccountLocked()) {
      return res.status(403).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts',
        lockedUntil: user.accountLockedUntil
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Register failed attempt and check if account should be locked
      await user.registerLoginAttempt();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Reset login attempts on successful login
    await user.resetLoginAttempts();
    
    // Rest of your login code (JWT generation, etc.)
    // ...
  } catch (error) {
    next(error);
  }
};