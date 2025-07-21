const express = require('express');
const Goal = require('../models/Goal');

const router = express.Router();

// @route   GET /api/goals
// @desc    Get user's goals
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

    const goals = await Goal.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Goal.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        goals,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          totalRecords: total,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/goals
// @desc    Create new goal
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

    const goal = await Goal.create({
      ...req.body,
      user: userId
    });

    res.status(201).json({
      status: 'success',
      message: 'Goal created successfully',
      data: { goal }
    });
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/goals/:id
// @desc    Update goal
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

    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Goal updated successfully',
      data: { goal }
    });
  } catch (error) {
    console.error('Update goal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/goals/:id
// @desc    Delete goal
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

    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: userId
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Goal deleted successfully'
    });
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/goals/:id/progress
// @desc    Add progress update to goal
// @access  Private
router.post('/:id/progress', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }

    const { value, notes } = req.body;

    const goal = await Goal.findOne({ _id: req.params.id, user: userId });
    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    // Add progress entry
    goal.progress.push({
      date: new Date(),
      value,
      notes
    });

    // Update current value
    goal.current = value;

    // Check if goal is completed
    if (value >= goal.target && goal.status === 'active') {
      goal.status = 'completed';
    }

    await goal.save();

    res.json({
      status: 'success',
      message: 'Progress updated successfully',
      data: { goal }
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router; 