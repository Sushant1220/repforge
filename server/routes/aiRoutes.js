const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { answerAiCoachQuery, generateWeeklyReport } = require('../utils/aiGenerator');

// @route POST /api/ai/coach
router.post('/coach', protect, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

    const reply = await answerAiCoachQuery(req.user, prompt);
    res.json({ reply });
  } catch (error) {
    console.error('AI Coach error:', error);
    res.status(500).json({ message: 'Server error processing AI Coach request' });
  }
});

// @route GET /api/ai/weekly-report
router.get('/weekly-report', protect, async (req, res) => {
  try {
    const report = generateWeeklyReport(req.user);
    res.json(report);
  } catch (error) {
    console.error('Weekly report error:', error);
    res.status(500).json({ message: 'Server error generating weekly report' });
  }
});

module.exports = router;
