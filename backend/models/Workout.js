const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required']
  },
  sets: [{
    reps: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number, // in seconds
      default: 0
    },
    distance: {
      type: Number, // in meters
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  notes: String,
  restTime: {
    type: Number, // in seconds
    default: 60
  }
});

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'yoga', 'sports'],
    required: true
  },
  exercises: [exerciseSchema],
  duration: {
    type: Number, // in minutes
    required: true
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  intensity: {
    type: String,
    enum: ['low', 'moderate', 'high'],
    default: 'moderate'
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'cancelled'],
    default: 'planned'
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  completedDate: {
    type: Date
  },
  notes: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard', 'expert']
  },
  tags: [String],
  isTemplate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
workoutSchema.index({ user: 1, scheduledDate: -1 });
workoutSchema.index({ user: 1, status: 1 });

// Virtual for total exercises
workoutSchema.virtual('totalExercises').get(function() {
  return this.exercises.length;
});

// Virtual for completion percentage
workoutSchema.virtual('completionPercentage').get(function() {
  if (this.exercises.length === 0) return 0;
  
  const completedExercises = this.exercises.filter(exercise => 
    exercise.sets.every(set => set.completed)
  );
  
  return Math.round((completedExercises.length / this.exercises.length) * 100);
});

// Ensure virtuals are serialized
workoutSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Workout', workoutSchema); 