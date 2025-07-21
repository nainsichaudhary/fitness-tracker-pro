const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  fitnessGoal: {
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'endurance', 'general-fitness'],
    default: 'general-fitness'
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  profile: {
    age: {
      type: Number,
      min: [13, 'Age must be at least 13'],
      max: [100, 'Age cannot exceed 100']
    },
    weight: {
      type: Number,
      min: [30, 'Weight must be at least 30kg'],
      max: [300, 'Weight cannot exceed 300kg']
    },
    height: {
      type: Number,
      min: [100, 'Height must be at least 100cm'],
      max: [250, 'Height cannot exceed 250cm']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    }
  },
  connectedDevice: {
    name: String,
    type: String,
    battery: Number,
    signal: String,
    lastConnected: Date
  },
  preferences: {
    theme: {
      type: String,
      default: 'default'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    }
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for BMI
userSchema.virtual('bmi').get(function() {
  if (this.profile.weight && this.profile.height) {
    const heightInMeters = this.profile.height / 100;
    return (this.profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }
  return null;
});

// Ensure virtuals are serialized
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema); 