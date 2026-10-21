const express = require('express');
const router = express.Router();
const { WorkoutPlanStore } = require('../config/dbStore');
const { protect } = require('../middleware/auth');

// @route GET /api/workouts
router.get('/', protect, async (req, res) => {
  try {
    const workouts = await WorkoutPlanStore.find({ userId: req.user._id });
    res.json(workouts);
  } catch (error) {
    console.error('Fetch workouts error:', error);
    res.status(500).json({ message: 'Server error fetching workouts' });
  }
});

// @route PUT /api/workouts/exercise-toggle
router.put('/exercise-toggle', protect, async (req, res) => {
  try {
    const { workoutId, exerciseId } = req.body;
    const workout = await WorkoutPlanStore.findOne({ _id: workoutId, userId: req.user._id });
    if (!workout) return res.status(404).json({ message: 'Workout plan not found' });

    const ex = workout.exercises.find(e => e.id === exerciseId || e._id === exerciseId || String(e.id) === String(exerciseId) || String(e._id) === String(exerciseId));
    if (!ex) return res.status(404).json({ message: 'Exercise not found' });

    ex.completed = !ex.completed;

    const allCompleted = workout.exercises.every(e => e.completed);
    workout.isCompleted = allCompleted;
    if (allCompleted) workout.completedAt = new Date();

    await workout.save();
    res.json(workout);
  } catch (error) {
    console.error('Toggle exercise error:', error);
    res.status(500).json({ message: 'Server error updating exercise' });
  }
});

// @route POST /api/workouts/log-set
router.post('/log-set', protect, async (req, res) => {
  try {
    const { workoutId, exerciseId, setNum, weight, reps } = req.body;
    const workout = await WorkoutPlanStore.findOne({ _id: workoutId, userId: req.user._id });
    if (!workout) return res.status(404).json({ message: 'Workout plan not found' });

    const ex = workout.exercises.find(e => e.id === exerciseId || e._id === exerciseId || String(e.id) === String(exerciseId) || String(e._id) === String(exerciseId));
    if (!ex) return res.status(404).json({ message: 'Exercise not found' });

    if (!ex.completedSets) ex.completedSets = [];

    const numWeight = parseFloat(weight) || ex.suggestedWeight || 0;
    const numReps = parseInt(reps) || 10;

    const existingSet = ex.completedSets.find(s => s.setNum === setNum);
    if (existingSet) {
      existingSet.weight = numWeight;
      existingSet.reps = numReps;
      existingSet.completed = true;
    } else {
      ex.completedSets.push({ setNum, weight: numWeight, reps: numReps, completed: true });
    }

    // Update Last Used Weight
    if (numWeight > 0) {
      ex.lastUsedWeight = numWeight;
    }

    // Check progressive overload logic
    if (ex.completedSets.length >= ex.sets) {
      ex.completed = true;
      // Progressive overload: small +2.5kg increase if user completed all sets with full weight
      if (numWeight > 0) {
        ex.suggestedWeight = +(numWeight + 2.5).toFixed(1);
      }
    }

    await workout.save();
    res.json(workout);
  } catch (error) {
    console.error('Log set error:', error);
    res.status(500).json({ message: 'Server error logging set' });
  }
});

// @route POST /api/workouts/complete
router.post('/complete', protect, async (req, res) => {
  try {
    const { workoutId, durationMinutes, feedback } = req.body;
    const workout = await WorkoutPlanStore.findOne({ _id: workoutId, userId: req.user._id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });

    workout.isCompleted = true;
    workout.completedAt = new Date();
    workout.exercises.forEach(e => e.completed = true);

    await workout.save();

    req.user.streakCount = (req.user.streakCount || 0) + 1;
    await req.user.save();

    res.json({
      message: 'Workout completed!',
      workout,
      streak: req.user.streakCount,
      summary: {
        duration: durationMinutes || workout.estimatedTime,
        exercisesCompleted: workout.exercises.length,
        totalSets: workout.exercises.reduce((acc, curr) => acc + curr.sets, 0),
        estimatedCalories: workout.estimatedCalories,
        feedback: feedback || 'Perfect'
      }
    });
  } catch (error) {
    console.error('Complete workout error:', error);
    res.status(500).json({ message: 'Server error marking workout completed' });
  }
});

module.exports = router;
