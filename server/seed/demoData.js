const {
  UserStore,
  WorkoutPlanStore,
  NutritionPlanStore,
  WeightLogStore,
  MeasurementLogStore,
  DailyCheckInStore,
  NotificationStore,
  AchievementStore
} = require('../config/dbStore');
const { calculateFitnessTargets } = require('../utils/fitnessCalc');
const { generateWorkoutPlanForUser, generateNutritionPlanForUser } = require('../utils/aiGenerator');

async function seedDemoData() {
  try {
    const existingAlex = await UserStore.findOne({ email: 'alex@repforge.ai' }) || await UserStore.findOne({ email: 'alex@fitforge.ai' });
    if (existingAlex) {
      // Ensure email is alex@repforge.ai
      if (existingAlex.email !== 'alex@repforge.ai') {
        existingAlex.email = 'alex@repforge.ai';
        await existingAlex.save();
      }
      console.log('Demo user Alex ready in store.');
      return existingAlex;
    }

    console.log('Seeding initial demo data for Alex Rivers...');

    const alexUserData = {
      name: 'Alex Rivers',
      email: 'alex@repforge.ai',
      password: 'Password123!',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      age: 26,
      gender: 'Male',
      height: 178,
      heightUnit: 'cm',
      weight: 80.8,
      weightUnit: 'kg',
      targetWeight: 75,
      fitnessGoal: 'Build Muscle',
      activityLevel: 'Moderately Active',
      experienceLevel: 'Intermediate',
      workoutLocation: 'Gym',
      workoutDaysPerWeek: 5,
      workoutDuration: '60 minutes',
      preferredTime: 'Morning',
      dietType: 'Non-Vegetarian',
      mealsPerDay: 4,
      allergies: [],
      medicalNotes: 'None',
      onboardingCompleted: true,
      streakCount: 12
    };

    alexUserData.targets = calculateFitnessTargets(alexUserData);
    const alexUser = await UserStore.create(alexUserData);
    const userId = alexUser._id;
    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Seed Workouts
    const workouts = generateWorkoutPlanForUser(alexUser);
    for (const w of workouts) {
      await WorkoutPlanStore.create({
        userId,
        day: w.day,
        title: w.title,
        estimatedTime: w.estimatedTime,
        estimatedCalories: w.estimatedCalories,
        exercises: w.exercises,
        isCompleted: w.day === 'Monday'
      });
    }

    // 2. Seed Nutrition Plan
    const nutritionData = generateNutritionPlanForUser(alexUser, todayStr);
    await NutritionPlanStore.create({
      userId,
      ...nutritionData
    });

    // 3. Seed Weight Logs (8 Weeks History)
    const weightHistory = [
      { date: '2026-08-03', weight: 83.0, notes: 'Starting FitForge journey' },
      { date: '2026-08-10', weight: 82.6, notes: 'Feeling great, steady energy' },
      { date: '2026-08-17', weight: 82.2, notes: 'Good strength gains in bench press' },
      { date: '2026-08-24', weight: 81.8, notes: 'Hit hydration target daily' },
      { date: '2026-08-31', weight: 81.5, notes: 'Adjusted protein intake slightly' },
      { date: '2026-09-07', weight: 81.2, notes: 'Completed 5 workouts this week' },
      { date: '2026-09-14', weight: 80.9, notes: 'Waist circumference down 2cm' },
      { date: '2026-09-21', weight: 80.8, notes: 'Current weight check-in' }
    ];

    for (const w of weightHistory) {
      await WeightLogStore.create({
        userId,
        weight: w.weight,
        unit: 'kg',
        date: w.date,
        notes: w.notes
      });
    }

    // 4. Seed Body Measurements
    await MeasurementLogStore.create({
      userId,
      date: todayStr,
      chest: 104,
      waist: 84,
      arms: 38.5,
      shoulders: 122,
      thighs: 58,
      hips: 96,
      bodyFat: 16.5
    });

    // 5. Seed Daily Check-In
    await DailyCheckInStore.create({
      userId,
      date: todayStr,
      weight: 80.8,
      workoutCompleted: true,
      dietFollowed: true,
      water: 2.5,
      sleep: 8.0,
      steps: 8420,
      energy: 9,
      mood: 'Excellent',
      score: 88,
      recommendation: 'Outstanding execution today! Hydration and protein targets are on point.'
    });

    // 6. Seed Notifications
    const sampleNotifications = [
      { userId, title: 'Time for your workout', message: 'Your Monday Chest & Triceps routine is scheduled for Morning.', type: 'workout', isRead: false, createdAt: new Date() },
      { userId, title: 'Protein Goal 65% Reached', message: 'You have logged 105g out of 165g protein target today.', type: 'nutrition', isRead: false, createdAt: new Date() },
      { userId, title: 'Don\'t forget to log your weight', message: 'Weekly weight logging keeps your progress chart updated.', type: 'weight', isRead: true, createdAt: new Date() },
      { userId, title: 'Hydration Update', message: 'You are 1.1L away from your 3.2L water goal.', type: 'water', isRead: true, createdAt: new Date() }
    ];
    for (const n of sampleNotifications) {
      await NotificationStore.create(n);
    }

    // 7. Seed Achievements
    const sampleBadges = [
      { userId, title: 'First Workout', description: 'Completed your very first fitness session', badgeIcon: 'Dumbbell', unlocked: true, unlockedAt: new Date('2026-08-04') },
      { userId, title: '7 Day Streak', description: 'Maintained fitness goals for 7 consecutive days', badgeIcon: 'Flame', unlocked: true, unlockedAt: new Date('2026-08-11') },
      { userId, title: '10 Workouts Completed', description: 'Finished 10 total workout routines', badgeIcon: 'Trophy', unlocked: true, unlockedAt: new Date('2026-08-18') },
      { userId, title: 'Protein Goal Champion', description: 'Hit protein target 5 days in a row', badgeIcon: 'Zap', unlocked: true, unlockedAt: new Date('2026-08-25') },
      { userId, title: '5kg Weight Loss Milestone', description: 'Successfully dropped 5kg towards target weight', badgeIcon: 'Target', unlocked: false },
      { userId, title: '30 Day Consistency', description: 'Checked in every single day for a full month', badgeIcon: 'Award', unlocked: false }
    ];
    for (const b of sampleBadges) {
      await AchievementStore.create(b);
    }

    console.log('Demo user Alex and complete historical fitness data seeded successfully in-memory!');
    return alexUser;
  } catch (error) {
    console.error('Error seeding demo data:', error);
  }
}

module.exports = seedDemoData;
