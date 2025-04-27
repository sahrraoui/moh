const express = require('express');
const router = express.Router();
const { 
    getProfile, 
    updateProfile, 
    deleteAccount,
    verifyNewEmail
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { check } = require('express-validator');

// Profile routes
router.get('/profile', protect, getProfile);

// Update profile with validation
router.put('/profile', [
    protect,
    check('firstName').optional().trim().isLength({ min: 1 }).withMessage('First name cannot be empty'),
    check('lastName').optional().trim().isLength({ min: 1 }).withMessage('Last name cannot be empty'),
    check('email').optional().isEmail().withMessage('Please provide a valid email address'),
    check('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    check('currentPassword').if(check('password').exists()).notEmpty().withMessage('Current password is required when changing password'),
    validateRequest
], updateProfile);

// Verify new email
router.post('/verify-email', [
    check('userId').notEmpty().withMessage('User ID is required'),
    check('otp').notEmpty().withMessage('Verification code is required'),
    validateRequest
], verifyNewEmail);

// Delete account
router.delete('/:id', protect, deleteAccount);

module.exports = router;