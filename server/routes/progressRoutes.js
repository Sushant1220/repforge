const express = require('express');
const router = express.Router();
const { WeightLogStore, MeasurementLogStore } = require('../config/dbStore');
const { protect } = require('../middleware/auth');
const { calculateFitnessTargets } = require('../utils/fitnessCalc');

// @route GET /api/progress/weight
router.get('/weight', protect, async (req, res) => {
  try {
    const logs = await WeightLogStore.find({ userId: req.user._id });
    logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(logs);
  } catch (error) {
    console.error('Fetch weight logs error:', error);
    res.status(500).json({ message: 'Server error fetching weight logs' });
  }
});

// @route POST /api/progress/weight
router.post('/weight', protect, async (req, res) => {
  try {
    const { weight, date, notes } = req.body;
    const logDate = date || new Date().toISOString().split('T')[0];

    const log = await WeightLogStore.create({
      userId: req.user._id,
      weight: Number(weight),
      unit: req.user.weightUnit || 'kg',
      date: logDate,
      notes: notes || ''
    });

    req.user.weight = Number(weight);
    req.user.targets = calculateFitnessTargets(req.user);
    await req.user.save();

    res.status(201).json(log);
  } catch (error) {
    console.error('Log weight error:', error);
    res.status(500).json({ message: 'Server error logging weight' });
  }
});

// @route GET /api/progress/measurements
router.get('/measurements', protect, async (req, res) => {
  try {
    const logs = await MeasurementLogStore.find({ userId: req.user._id });
    logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(logs);
  } catch (error) {
    console.error('Fetch measurement logs error:', error);
    res.status(500).json({ message: 'Server error fetching measurements' });
  }
});

// @route POST /api/progress/measurements
router.post('/measurements', protect, async (req, res) => {
  try {
    const { chest, waist, arms, shoulders, thighs, hips, bodyFat, date } = req.body;
    const logDate = date || new Date().toISOString().split('T')[0];

    const log = await MeasurementLogStore.create({
      userId: req.user._id,
      date: logDate,
      chest: Number(chest),
      waist: Number(waist),
      arms: Number(arms),
      shoulders: Number(shoulders),
      thighs: Number(thighs),
      hips: Number(hips),
      bodyFat: Number(bodyFat)
    });

    res.status(201).json(log);
  } catch (error) {
    console.error('Log measurements error:', error);
    res.status(500).json({ message: 'Server error logging measurements' });
  }
});

module.exports = router;
