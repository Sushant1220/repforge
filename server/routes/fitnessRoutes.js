const express = require('express');
const router = express.Router();
const { UserStore, WorkoutPlanStore, NutritionPlanStore } = require('../config/dbStore');
const { protect } = require('../middleware/auth');
const { calculateFitnessTargets } = require('../utils/fitnessCalc');
const { generateWorkoutPlanForUser, generateNutritionPlanForUser, resolveExperienceLevel } = require('../utils/aiGenerator');

// @route POST /api/fitness/onboarding
router.post('/onboarding', protect, async (req, res) => {
  try {
    const user = req.user;
    const {
      name, age, gender, height, heightUnit, weight, weightUnit,
      fitnessGoal, targetWeight, activityLevel, experienceLevel, trainingDuration,
      workoutLocation, workoutDaysPerWeek, workoutDuration, preferredTime,
      dietType, mealsPerDay, allergies, medicalNotes
    } = req.body;

    if (name) user.name = name;
    if (age) user.age = Number(age);
    if (gender) user.gender = gender;
    if (height) user.height = Number(height);
    if (heightUnit) user.heightUnit = heightUnit;
    if (weight) user.weight = Number(weight);
    if (weightUnit) user.weightUnit = weightUnit;
    if (fitnessGoal) user.fitnessGoal = fitnessGoal;
    if (targetWeight) user.targetWeight = Number(targetWeight);
    if (activityLevel) user.activityLevel = activityLevel;
    if (trainingDuration) user.trainingDuration = trainingDuration;

    // Automatically assign experience level based on training duration or explicit override
    const computedLevel = resolveExperienceLevel(trainingDuration || user.trainingDuration, experienceLevel);
    user.experienceLevel = computedLevel;

    if (workoutLocation) user.workoutLocation = workoutLocation;
    if (workoutDaysPerWeek) user.workoutDaysPerWeek = Number(workoutDaysPerWeek);
    if (workoutDuration) user.workoutDuration = workoutDuration;
    if (preferredTime) user.preferredTime = preferredTime;
    if (dietType) user.dietType = dietType;
    if (mealsPerDay) user.mealsPerDay = Number(mealsPerDay);
    if (allergies) user.allergies = allergies;
    if (medicalNotes) user.medicalNotes = medicalNotes;

    user.onboardingCompleted = true;
    user.targets = calculateFitnessTargets(user);
    await user.save();

    // Remove existing plans and generate fresh level-specific AI plans
    await WorkoutPlanStore.deleteMany({ userId: user._id });
    await NutritionPlanStore.deleteMany({ userId: user._id });

    const workouts = generateWorkoutPlanForUser(user);
    for (const w of workouts) {
      await WorkoutPlanStore.create({
        userId: user._id,
        day: w.day,
        title: w.title,
        experienceLevel: user.experienceLevel,
        estimatedTime: w.estimatedTime,
        estimatedCalories: w.estimatedCalories,
        exercises: w.exercises
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const nutritionData = generateNutritionPlanForUser(user, todayStr);
    await NutritionPlanStore.create({
      userId: user._id,
      ...nutritionData
    });

    res.json({
      message: 'Onboarding completed successfully',
      user,
      targets: user.targets
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ message: 'Server error saving onboarding' });
  }
});

// @route POST /api/fitness/recalculate
router.post('/recalculate', protect, async (req, res) => {
  try {
    const user = req.user;
    if (req.body.weight) user.weight = Number(req.body.weight);
    if (req.body.targetWeight) user.targetWeight = Number(req.body.targetWeight);
    if (req.body.fitnessGoal) user.fitnessGoal = req.body.fitnessGoal;
    if (req.body.activityLevel) user.activityLevel = req.body.activityLevel;
    if (req.body.trainingDuration) user.trainingDuration = req.body.trainingDuration;

    if (req.body.experienceLevel || req.body.trainingDuration) {
      const computedLevel = resolveExperienceLevel(req.body.trainingDuration || user.trainingDuration, req.body.experienceLevel);
      user.experienceLevel = computedLevel;

      // Regenerate workout plan if experience level changed
      await WorkoutPlanStore.deleteMany({ userId: user._id });
      const newWorkouts = generateWorkoutPlanForUser(user);
      for (const w of newWorkouts) {
        await WorkoutPlanStore.create({
          userId: user._id,
          day: w.day,
          title: w.title,
          experienceLevel: user.experienceLevel,
          estimatedTime: w.estimatedTime,
          estimatedCalories: w.estimatedCalories,
          exercises: w.exercises
        });
      }
    }

    user.targets = calculateFitnessTargets(user);
    await user.save();

    res.json({
      message: 'Targets and workout plan recalculated',
      user,
      targets: user.targets
    });
  } catch (error) {
    console.error('Recalculate error:', error);
    res.status(500).json({ message: 'Server error recalculating targets' });
  }
});

// @route GET /api/fitness/plan
router.get('/plan', protect, async (req, res) => {
  try {
    const user = req.user;
    let workouts = await WorkoutPlanStore.find({ userId: user._id });

    if (!workouts || workouts.length === 0) {
      const generated = generateWorkoutPlanForUser(user);
      for (const w of generated) {
        await WorkoutPlanStore.create({
          userId: user._id,
          day: w.day,
          title: w.title,
          experienceLevel: user.experienceLevel || 'Beginner',
          estimatedTime: w.estimatedTime,
          estimatedCalories: w.estimatedCalories,
          exercises: w.exercises
        });
      }
      workouts = await WorkoutPlanStore.find({ userId: user._id });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    let nutrition = await NutritionPlanStore.findOne({ userId: user._id, date: todayStr });

    if (!nutrition) {
      const nutritionData = generateNutritionPlanForUser(user, todayStr);
      nutrition = await NutritionPlanStore.create({
        userId: user._id,
        ...nutritionData
      });
    }

    res.json({
      user,
      targets: user.targets,
      workouts,
      nutrition
    });
  } catch (error) {
    console.error('Fetch fitness plan error:', error);
    res.status(500).json({ message: 'Server error fetching fitness plan' });
  }
});

module.exports = router;
