const express = require('express');
const User = require('../models/User');
const Workout = require('../models/Workout');
const Nutrition = require('../models/Nutrition');
const Goal = require('../models/Goal');

const router = express.Router();

// Admin authentication middleware (simplified for demo)
const adminAuth = async (req, res, next) => {
  try {
    const adminEmail = req.headers['admin-email'];
    const adminPassword = req.headers['admin-password'];
    
    if (adminEmail !== process.env.ADMIN_EMAIL || adminPassword !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        status: 'error',
        message: 'Admin authentication failed'
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Authentication error'
    });
  }
};

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Admin
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalWorkouts = await Workout.countDocuments();
    const totalMeals = await Nutrition.countDocuments();
    const totalGoals = await Goal.countDocuments();

    // Get active users (logged in within last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo }
    });

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get completed workouts this week
    const completedWorkouts = await Workout.countDocuments({
      status: 'completed',
      completedDate: { $gte: sevenDaysAgo }
    });

    // Get user growth data (last 30 days)
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get fitness goal distribution
    const goalDistribution = await User.aggregate([
      {
        $group: {
          _id: "$fitnessGoal",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get experience level distribution
    const experienceDistribution = await User.aggregate([
      {
        $group: {
          _id: "$experienceLevel",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      status: 'success',
      data: {
        overview: {
          totalUsers,
          activeUsers,
          newUsers,
          totalWorkouts,
          completedWorkouts,
          totalMeals,
          totalGoals
        },
        charts: {
          userGrowth,
          goalDistribution,
          experienceDistribution
        }
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination and filters
// @access  Admin
router.get('/users', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const fitnessGoal = req.query.fitnessGoal || '';
    const experienceLevel = req.query.experienceLevel || '';
    const isActive = req.query.isActive;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (fitnessGoal) filter.fitnessGoal = fitnessGoal;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (isActive !== undefined) {
      if (isActive === 'true') {
        filter.lastLogin = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
      } else {
        filter.$or = [
          { lastLogin: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
          { lastLogin: { $exists: false } }
        ];
      }
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        users,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          totalRecords: total,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/users/:id
// @desc    Get specific user details
// @access  Admin
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Get user's recent activity
    const recentWorkouts = await Workout.find({ user: req.params.id })
      .sort({ scheduledDate: -1 })
      .limit(5);

    const recentMeals = await Nutrition.find({ user: req.params.id })
      .sort({ date: -1 })
      .limit(5);

    const activeGoals = await Goal.find({ 
      user: req.params.id, 
      status: 'active' 
    });

    res.json({
      status: 'success',
      data: {
        user,
        recentWorkouts,
        recentMeals,
        activeGoals
      }
    });
  } catch (error) {
    console.error('Admin user detail error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (admin)
// @access  Admin
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const { isActive, isAdmin, fitnessGoal, experienceLevel } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive,
        isAdmin,
        fitnessGoal,
        experienceLevel
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      message: 'User updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Admin user update error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user (admin)
// @access  Admin
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Delete associated data
    await Workout.deleteMany({ user: req.params.id });
    await Nutrition.deleteMany({ user: req.params.id });
    await Goal.deleteMany({ user: req.params.id });

    res.json({
      status: 'success',
      message: 'User and associated data deleted successfully'
    });
  } catch (error) {
    console.error('Admin user delete error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/workouts
// @desc    Get all workouts with filters
// @access  Admin
router.get('/workouts', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type || '';
    const status = req.query.status || '';
    const userId = req.query.userId || '';

    const skip = (page - 1) * limit;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (userId) filter.user = userId;

    const workouts = await Workout.find(filter)
      .populate('user', 'firstName lastName email')
      .sort({ scheduledDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Workout.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        workouts,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          totalRecords: total,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Admin workouts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/nutrition
// @desc    Get all nutrition data with filters
// @access  Admin
router.get('/nutrition', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type || '';
    const userId = req.query.userId || '';

    const skip = (page - 1) * limit;

    const filter = {};
    if (type) filter.type = type;
    if (userId) filter.user = userId;

    const meals = await Nutrition.find(filter)
      .populate('user', 'firstName lastName email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Nutrition.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        meals,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          totalRecords: total,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Admin nutrition error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/goals
// @desc    Get all goals with filters
// @access  Admin
router.get('/goals', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type || '';
    const status = req.query.status || '';
    const userId = req.query.userId || '';

    const skip = (page - 1) * limit;

    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (userId) filter.user = userId;

    const goals = await Goal.find(filter)
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Goal.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        goals,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          totalRecords: total,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Admin goals error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get detailed analytics
// @access  Admin
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const period = req.query.period || '30'; // days
    const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

    // User analytics
    const userAnalytics = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          newUsers: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Workout analytics
    const workoutAnalytics = await Workout.aggregate([
      {
        $match: {
          scheduledDate: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          avgDuration: { $avg: "$duration" },
          avgCalories: { $avg: "$caloriesBurned" }
        }
      }
    ]);

    // Nutrition analytics
    const nutritionAnalytics = await Nutrition.aggregate([
      {
        $match: {
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          avgCalories: { $avg: "$totalCalories" },
          avgProtein: { $avg: "$totalProtein" },
          avgCarbs: { $avg: "$totalCarbs" },
          avgFat: { $avg: "$totalFat" }
        }
      }
    ]);

    // Goal completion analytics
    const goalAnalytics = await Goal.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          avgProgress: { $avg: "$progressPercentage" }
        }
      }
    ]);

    res.json({
      status: 'success',
      data: {
        userAnalytics,
        workoutAnalytics,
        nutritionAnalytics,
        goalAnalytics
      }
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router; 