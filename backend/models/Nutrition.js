const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required']
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    default: 0
  },
  carbs: {
    type: Number,
    default: 0
  },
  fat: {
    type: Number,
    default: 0
  },
  fiber: {
    type: Number,
    default: 0
  },
  sugar: {
    type: Number,
    default: 0
  },
  sodium: {
    type: Number,
    default: 0
  }
});

const mealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Meal name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'pre-workout', 'post-workout'],
    required: true
  },
  foods: [foodItemSchema],
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  time: {
    type: String,
    required: true
  },
  notes: String,
  image: String,
  isLogged: {
    type: Boolean,
    default: true
  },
  mealPlan: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for efficient queries
mealSchema.index({ user: 1, date: -1 });
mealSchema.index({ user: 1, type: 1 });

// Virtual for total calories
mealSchema.virtual('totalCalories').get(function() {
  return this.foods.reduce((total, food) => total + food.calories, 0);
});

// Virtual for total protein
mealSchema.virtual('totalProtein').get(function() {
  return this.foods.reduce((total, food) => total + food.protein, 0);
});

// Virtual for total carbs
mealSchema.virtual('totalCarbs').get(function() {
  return this.foods.reduce((total, food) => total + food.carbs, 0);
});

// Virtual for total fat
mealSchema.virtual('totalFat').get(function() {
  return this.foods.reduce((total, food) => total + food.fat, 0);
});

// Ensure virtuals are serialized
mealSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Nutrition', mealSchema); 