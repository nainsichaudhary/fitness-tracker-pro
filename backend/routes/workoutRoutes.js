const express = require('express');
const Workout = require('../models/Workout');

const router = express.Router();

// @route   GET /api/workouts
// @desc    Get user's workouts
// @access  Private
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }

    const { status, type, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { user: userId };
    if (status) filter.status = status;
    if (type) filter.type = type;

    const workouts = await Workout.find(filter)
      .sort({ scheduledDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Workout.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        workouts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          totalRecords: total,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/workouts
// @desc    Create new workout
// @access  Private
router.post('/', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }

    const workout = await Workout.create({
      ...req.body,
      user: userId
    });

    res.status(201).json({
      status: 'success',
      message: 'Workout created successfully',
      data: { workout }
    });
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/workouts/:id
// @desc    Update workout
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }

    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({
        status: 'error',
        message: 'Workout not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Workout updated successfully',
      data: { workout }
    });
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete workout
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }

    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: userId
    });

    if (!workout) {
      return res.status(404).json({
        status: 'error',
        message: 'Workout not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router; 