const express = require('express');
const router = express.Router();
const { AchievementStore } = require('../config/dbStore');
const { protect } = require('../middleware/auth');

// @route GET /api/achievements
router.get('/', protect, async (req, res) => {
  try {
    const achievements = await AchievementStore.find({ userId: req.user._id });
    res.json({
      streakCount: req.user.streakCount || 12,
      achievements
    });
  } catch (error) {
    console.error('Fetch achievements error:', error);
    res.status(500).json({ message: 'Server error fetching achievements' });
  }
});

module.exports = router;
