const express = require('express');
const Nutrition = require('../models/Nutrition');

const router = express.Router();

// @route   GET /api/nutrition
// @desc    Get user's nutrition data
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

    const { type, date, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { user: userId };
    if (type) filter.type = type;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const meals = await Nutrition.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Nutrition.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        meals,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          totalRecords: total,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get nutrition error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   POST /api/nutrition
// @desc    Create new meal
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

    const meal = await Nutrition.create({
      ...req.body,
      user: userId
    });

    res.status(201).json({
      status: 'success',
      message: 'Meal logged successfully',
      data: { meal }
    });
  } catch (error) {
    console.error('Create meal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   PUT /api/nutrition/:id
// @desc    Update meal
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

    const meal = await Nutrition.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: 'Meal not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Meal updated successfully',
      data: { meal }
    });
  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/nutrition/:id
// @desc    Delete meal
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

    const meal = await Nutrition.findOneAndDelete({
      _id: req.params.id,
      user: userId
    });

    if (!meal) {
      return res.status(404).json({
        status: 'error',
        message: 'Meal not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
});

module.exports = router; 