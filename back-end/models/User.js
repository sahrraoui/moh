const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: function() {
      // First name is required only if no Google ID is provided
      return !this.googleId;
    },
    trim: true
  },
  lastName: {
    type: String,
    required: function() {
      // Last name is required only if no Google ID is provided
      return !this.googleId;
    },
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: function() {
      // Password is required only if no OAuth provider is used
      return !this.googleId;
    },
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'property_owner', 'admin'],
    default: 'user'
  },
  googleId: String,
  profileImage: String,
  phone: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save hook to hash password
UserSchema.pre('save', async function(next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password with salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);