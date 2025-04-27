const User = require('../models/User');
const { generateOTP, sendActivationEmail } = require('../utils/emailService');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, password, currentPassword } = req.body;
        const updateData = {};
        
        // Find current user
        const user = await User.findById(req.user.id).select('+password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Handle first name update
        if (firstName) updateData.firstName = firstName;
        
        // Handle last name update
        if (lastName) updateData.lastName = lastName;
        
        // Handle password update
        if (password) {
            // Verify current password if provided
            if (!currentPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is required to update password'
                });
            }
            
            // Check if current password is correct
            const isPasswordCorrect = await user.comparePassword(currentPassword);
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }
            
            // Update password
            updateData.password = password;
        }
        
        // Handle email update
        let emailChanged = false;
        let originalEmail = user.email;
        
        if (email && email !== user.email) {
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use'
                });
            }
            
            // Store new email temporarily
            updateData.newEmail = email;
            // Set verification status to false for new email
            updateData.isEmailVerified = false;
            emailChanged = true;
        }
        
        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        // Send verification email if email changed
        if (emailChanged) {
            try {
                // Generate OTP for email verification
                const otp = await generateOTP(user._id, 'emailChange');
                
                // Send verification email to new email
                await sendActivationEmail({
                    email: updateData.newEmail,
                    otp: otp
                });
                
                return res.status(200).json({
                    success: true,
                    message: 'Profile updated. Please verify your new email address with the code sent to your new email.',
                    data: updatedUser,
                    emailVerificationRequired: true
                });
            } catch (emailError) {
                console.error('Error sending verification email:', emailError);
                
                // Revert email change
                await User.findByIdAndUpdate(
                    req.user.id,
                    { email: originalEmail, $unset: { newEmail: 1 } },
                    { new: true }
                );
                
                return res.status(500).json({
                    success: false,
                    message: 'Error sending verification email. Email not updated.',
                    error: emailError.message
                });
            }
        }
        
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
};

// Verify new email
exports.verifyNewEmail = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        
        // Verify OTP
        const isValid = await verifyOTP(userId, otp, 'emailChange');
        
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification code'
            });
        }
        
        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Check if newEmail exists
        if (!user.newEmail) {
            return res.status(400).json({
                success: false,
                message: 'No email change request found'
            });
        }
        
        // Update email
        user.email = user.newEmail;
        user.isEmailVerified = true;
        user.newEmail = undefined; // Remove temporary field
        await user.save();
        
        res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            data: {
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error verifying email',
            error: error.message
        });
    }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting account',
            error: error.message
        });
    }
};