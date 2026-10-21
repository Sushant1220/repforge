const express = require('express');
const router = express.Router();
const { DailyCheckInStore } = require('../config/dbStore');
const { protect } = require('../middleware/auth');

// @route GET /api/checkin/today
router.get('/today', protect, async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const checkin = await DailyCheckInStore.findOne({ userId: req.user._id, date: todayStr });
    res.json(checkin || null);
  } catch (error) {
    console.error('Fetch today checkin error:', error);
    res.status(500).json({ message: 'Server error fetching checkin' });
  }
});

// @route POST /api/checkin
router.post('/', protect, async (req, res) => {
  try {
    const { weight, workoutCompleted, dietFollowed, water, sleep, steps, energy, mood } = req.body;
    const todayStr = new Date().toISOString().split('T')[0];

    let score = 0;
    if (workoutCompleted) score += 25;
    if (dietFollowed) score += 25;
    if (water >= (req.user.targets?.water || 3.0)) score += 15; else if (water > 1.5) score += 10;
    if (sleep >= 7) score += 15; else if (sleep >= 6) score += 10;
    if (steps >= (req.user.targets?.steps || 8000)) score += 20; else if (steps > 5000) score += 10;

    let recommendation = 'Great job staying on track! Keep prioritizing recovery tonight.';
    if (score >= 85) {
      recommendation = 'Outstanding consistency! You are locked into your target goals.';
    } else if (score < 60) {
      recommendation = 'Don\'t worry about minor bumps. Focus on completing your water goal and getting 8 hours of sleep tonight.';
    }

    let checkin = await DailyCheckInStore.findOne({ userId: req.user._id, date: todayStr });
    if (checkin) {
      checkin.weight = weight !== undefined ? Number(weight) : checkin.weight;
      checkin.workoutCompleted = workoutCompleted;
      checkin.dietFollowed = dietFollowed;
      checkin.water = Number(water);
      checkin.sleep = Number(sleep);
      checkin.steps = Number(steps);
      checkin.energy = Number(energy);
      checkin.mood = mood;
      checkin.score = score;
      checkin.recommendation = recommendation;
      await checkin.save();
    } else {
      checkin = await DailyCheckInStore.create({
        userId: req.user._id,
        date: todayStr,
        weight: Number(weight),
        workoutCompleted,
        dietFollowed,
        water: Number(water),
        sleep: Number(sleep),
        steps: Number(steps),
        energy: Number(energy),
        mood,
        score,
        recommendation
      });
    }

    req.user.streakCount = (req.user.streakCount || 0) + 1;
    await req.user.save();

    res.json(checkin);
  } catch (error) {
    console.error('Submit checkin error:', error);
    res.status(500).json({ message: 'Server error submitting daily checkin' });
  }
});

module.exports = router;
