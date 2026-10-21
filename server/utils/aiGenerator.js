/**
 * AI Recommendation Engine for FitForge AI - Experience Level System
 */

// Helper function to resolve level based on training duration
function resolveExperienceLevel(trainingDuration, explicitLevel) {
  if (explicitLevel && ['Beginner', 'Intermediate', 'Advanced'].includes(explicitLevel)) {
    return explicitLevel;
  }
  if (!trainingDuration) return 'Beginner';

  const duration = trainingDuration.trim();
  if (duration === '1–2 years' || duration === '1-2 years') {
    return 'Intermediate';
  }
  if (duration === 'More than 2 years') {
    return 'Advanced';
  }
  // Up to 12 months (Just Starting, Less than 3 months, 3–6 months, 6–12 months) -> Beginner
  return 'Beginner';
}

function getLevelGuidance(level) {
  switch (level) {
    case 'Intermediate':
      return {
        level: 'Intermediate',
        badgeText: 'INTERMEDIATE PLAN',
        description: 'Your workout plan will focus on progressive overload, compound movements and increasing training volume.',
        intensityText: 'Choose a weight where the final 2–3 reps feel challenging while maintaining proper form.'
      };
    case 'Advanced':
      return {
        level: 'Advanced',
        badgeText: 'ADVANCED PLAN',
        description: 'Your workout plan will focus on high volume, strength & hypertrophy splits, and advanced exercise variations.',
        intensityText: 'Use a challenging load that matches the programmed rep range while maintaining controlled technique.'
      };
    case 'Beginner':
    default:
      return {
        level: 'Beginner',
        badgeText: 'BEGINNER PLAN',
        description: 'Your workout plan will focus on learning proper technique, building consistency and gradually increasing strength.',
        intensityText: 'Choose a weight you can control comfortably while learning proper form.'
      };
  }
}

// 1. BEGINNER WORKOUT TEMPLATE (Focus on machines, form, safety, 2-3 sets, 8-15 reps)
const beginnerWorkouts = [
  {
    day: 'Monday',
    title: 'Chest & Arms Basics (Beginner)',
    estimatedTime: 40,
    estimatedCalories: 280,
    exercises: [
      { id: 'beg-1', name: 'Barbell Bench Press', targetMuscle: 'Chest', sets: 3, reps: '10-12', restTime: 90, suggestedWeight: 30, completed: false },
      { id: 'beg-2', name: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, reps: '10-12', restTime: 75, suggestedWeight: 12, completed: false },
      { id: 'beg-3', name: 'Triceps Rope Pushdowns', targetMuscle: 'Triceps', sets: 3, reps: '12-15', restTime: 60, suggestedWeight: 14, completed: false },
      { id: 'beg-4', name: 'EZ-Bar Bicep Curls', targetMuscle: 'Biceps', sets: 3, reps: '12-15', restTime: 60, suggestedWeight: 12, completed: false }
    ]
  },
  {
    day: 'Tuesday',
    title: 'Back & Core Foundation (Beginner)',
    estimatedTime: 40,
    estimatedCalories: 300,
    exercises: [
      { id: 'beg-5', name: 'Lat Pulldowns', targetMuscle: 'Lats', sets: 3, reps: '10-12', restTime: 90, suggestedWeight: 35, completed: false },
      { id: 'beg-6', name: 'Seated Cable Rows', targetMuscle: 'Mid Back', sets: 3, reps: '10-12', restTime: 75, suggestedWeight: 30, completed: false },
      { id: 'beg-7', name: 'Hammer Curls', targetMuscle: 'Brachialis', sets: 2, reps: '12', restTime: 60, suggestedWeight: 8, completed: false },
      { id: 'beg-8', name: 'Plank Hold', targetMuscle: 'Core', sets: 3, reps: '45 sec', restTime: 60, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Wednesday',
    title: 'Legs & Lower Body (Beginner)',
    estimatedTime: 45,
    estimatedCalories: 340,
    exercises: [
      { id: 'beg-9', name: 'Leg Press', targetMuscle: 'Quads & Glutes', sets: 3, reps: '12-15', restTime: 90, suggestedWeight: 60, completed: false },
      { id: 'beg-10', name: 'Romanian Deadlifts', targetMuscle: 'Hamstrings', sets: 3, reps: '10-12', restTime: 90, suggestedWeight: 35, completed: false },
      { id: 'beg-11', name: 'Standing Calf Raises', targetMuscle: 'Calves', sets: 3, reps: '15', restTime: 45, suggestedWeight: 20, completed: false }
    ]
  },
  {
    day: 'Thursday',
    title: 'Active Recovery & Flexibility',
    estimatedTime: 30,
    estimatedCalories: 160,
    exercises: [
      { id: 'beg-12', name: 'Light Incline Treadmill Walk', targetMuscle: 'Cardio', sets: 1, reps: '20 min', restTime: 0, suggestedWeight: 0, completed: false },
      { id: 'beg-13', name: 'Full Body Dynamic Stretching', targetMuscle: 'Mobility', sets: 1, reps: '15 min', restTime: 0, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Friday',
    title: 'Shoulders & Full Body (Beginner)',
    estimatedTime: 40,
    estimatedCalories: 310,
    exercises: [
      { id: 'beg-14', name: 'Overhead Dumbbell Press', targetMuscle: 'Deltoids', sets: 3, reps: '10-12', restTime: 90, suggestedWeight: 10, completed: false },
      { id: 'beg-15', name: 'Dumbbell Lateral Raises', targetMuscle: 'Side Delts', sets: 3, reps: '12-15', restTime: 60, suggestedWeight: 6, completed: false },
      { id: 'beg-16', name: 'Dumbbell Walking Lunges', targetMuscle: 'Quads & Glutes', sets: 2, reps: '10 per leg', restTime: 60, suggestedWeight: 8, completed: false }
    ]
  },
  {
    day: 'Saturday',
    title: 'Rest & Recovery',
    estimatedTime: 20,
    estimatedCalories: 100,
    exercises: [
      { id: 'beg-17', name: 'Foam Rolling Major Muscles', targetMuscle: 'Recovery', sets: 1, reps: '10 min', restTime: 0, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Sunday',
    title: 'Rest Day',
    estimatedTime: 15,
    estimatedCalories: 80,
    exercises: [
      { id: 'beg-18', name: 'Full Body Dynamic Stretching', targetMuscle: 'Mobility', sets: 1, reps: '15 min', restTime: 0, suggestedWeight: 0, completed: false }
    ]
  }
];

// 2. INTERMEDIATE WORKOUT TEMPLATE (Compound focus, 3-4 sets, 6-12 reps, 4-5 days)
const intermediateWorkouts = [
  {
    day: 'Monday',
    title: 'Chest & Triceps Focus (Intermediate)',
    estimatedTime: 55,
    estimatedCalories: 430,
    exercises: [
      { id: 'int-1', name: 'Barbell Bench Press', targetMuscle: 'Chest', sets: 4, reps: '8-10', restTime: 90, suggestedWeight: 65, completed: false },
      { id: 'int-2', name: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, reps: '10-12', restTime: 75, suggestedWeight: 24, completed: false },
      { id: 'int-3', name: 'Cable Chest Flyes', targetMuscle: 'Lower Chest', sets: 3, reps: '12-15', restTime: 60, suggestedWeight: 14, completed: false },
      { id: 'int-4', name: 'Triceps Rope Pushdowns', targetMuscle: 'Triceps', sets: 4, reps: '12-15', restTime: 60, suggestedWeight: 22, completed: false },
      { id: 'int-5', name: 'Dips', targetMuscle: 'Lower Chest & Triceps', sets: 3, reps: '10-12', restTime: 60, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Tuesday',
    title: 'Back & Biceps Power (Intermediate)',
    estimatedTime: 60,
    estimatedCalories: 460,
    exercises: [
      { id: 'int-6', name: 'Lat Pulldowns', targetMuscle: 'Lats', sets: 4, reps: '10-12', restTime: 90, suggestedWeight: 55, completed: false },
      { id: 'int-7', name: 'Bent-Over Barbell Rows', targetMuscle: 'Upper Back', sets: 4, reps: '8-10', restTime: 90, suggestedWeight: 50, completed: false },
      { id: 'int-8', name: 'Seated Cable Rows', targetMuscle: 'Mid Back', sets: 3, reps: '10-12', restTime: 75, suggestedWeight: 45, completed: false },
      { id: 'int-9', name: 'EZ-Bar Bicep Curls', targetMuscle: 'Biceps', sets: 4, reps: '10-12', restTime: 60, suggestedWeight: 20, completed: false },
      { id: 'int-10', name: 'Hammer Curls', targetMuscle: 'Brachialis', sets: 3, reps: '12-15', restTime: 60, suggestedWeight: 14, completed: false }
    ]
  },
  {
    day: 'Wednesday',
    title: 'Legs & Abs Hypertrophy (Intermediate)',
    estimatedTime: 65,
    estimatedCalories: 520,
    exercises: [
      { id: 'int-11', name: 'Barbell Back Squats', targetMuscle: 'Quadriceps', sets: 4, reps: '8-10', restTime: 120, suggestedWeight: 80, completed: false },
      { id: 'int-12', name: 'Romanian Deadlifts', targetMuscle: 'Hamstrings', sets: 4, reps: '10-12', restTime: 90, suggestedWeight: 65, completed: false },
      { id: 'int-13', name: 'Leg Press', targetMuscle: 'Quads & Glutes', sets: 3, reps: '12-15', restTime: 90, suggestedWeight: 120, completed: false },
      { id: 'int-14', name: 'Standing Calf Raises', targetMuscle: 'Calves', sets: 4, reps: '15-20', restTime: 45, suggestedWeight: 40, completed: false },
      { id: 'int-15', name: 'Hanging Leg Raises', targetMuscle: 'Lower Abs', sets: 3, reps: '15', restTime: 45, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Thursday',
    title: 'Active Recovery & Core',
    estimatedTime: 35,
    estimatedCalories: 210,
    exercises: [
      { id: 'int-16', name: 'Light Incline Treadmill Walk', targetMuscle: 'Cardio', sets: 1, reps: '25 min', restTime: 0, suggestedWeight: 0, completed: false },
      { id: 'int-17', name: 'Plank Hold', targetMuscle: 'Core', sets: 3, reps: '60 sec', restTime: 45, suggestedWeight: 0, completed: false },
      { id: 'int-18', name: 'Ab Wheel Rollouts', targetMuscle: 'Abs', sets: 3, reps: '12', restTime: 60, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Friday',
    title: 'Shoulders & Arms Precision (Intermediate)',
    estimatedTime: 55,
    estimatedCalories: 410,
    exercises: [
      { id: 'int-19', name: 'Overhead Dumbbell Press', targetMuscle: 'Deltoids', sets: 4, reps: '8-10', restTime: 90, suggestedWeight: 20, completed: false },
      { id: 'int-20', name: 'Dumbbell Lateral Raises', targetMuscle: 'Side Delts', sets: 4, reps: '12-15', restTime: 60, suggestedWeight: 10, completed: false },
      { id: 'int-21', name: 'Face Pulls', targetMuscle: 'Rear Delts', sets: 3, reps: '15', restTime: 60, suggestedWeight: 18, completed: false },
      { id: 'int-22', name: 'Preacher Curls', targetMuscle: 'Biceps Peak', sets: 3, reps: '10-12', restTime: 60, suggestedWeight: 22, completed: false }
    ]
  },
  {
    day: 'Saturday',
    title: 'Full Body Conditioning',
    estimatedTime: 50,
    estimatedCalories: 480,
    exercises: [
      { id: 'int-23', name: 'Conventional Deadlift', targetMuscle: 'Posterior Chain', sets: 3, reps: '6-8', restTime: 120, suggestedWeight: 100, completed: false },
      { id: 'int-24', name: 'Dumbbell Walking Lunges', targetMuscle: 'Quads & Glutes', sets: 3, reps: '12 per leg', restTime: 75, suggestedWeight: 14, completed: false },
      { id: 'int-25', name: 'Push-Ups to Renegade Row', targetMuscle: 'Full Body', sets: 3, reps: '10', restTime: 60, suggestedWeight: 12, completed: false }
    ]
  },
  {
    day: 'Sunday',
    title: 'Rest & Mobility Day',
    estimatedTime: 20,
    estimatedCalories: 100,
    exercises: [
      { id: 'int-26', name: 'Full Body Dynamic Stretching', targetMuscle: 'Mobility', sets: 1, reps: '15 min', restTime: 0, suggestedWeight: 0, completed: false },
      { id: 'int-27', name: 'Foam Rolling Major Muscles', targetMuscle: 'Recovery', sets: 1, reps: '10 min', restTime: 0, suggestedWeight: 0, completed: false }
    ]
  }
];

// 3. ADVANCED WORKOUT TEMPLATE (Heavy compounds 4-8 reps, Hypertrophy 8-12 reps, High volume 5-6 days)
const advancedWorkouts = [
  {
    day: 'Monday',
    title: 'Heavy Chest & Triceps (Advanced)',
    estimatedTime: 65,
    estimatedCalories: 520,
    exercises: [
      { id: 'adv-1', name: 'Barbell Bench Press', targetMuscle: 'Chest', sets: 5, reps: '4-6', restTime: 150, suggestedWeight: 85, completed: false },
      { id: 'adv-2', name: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 4, reps: '8-10', restTime: 90, suggestedWeight: 32, completed: false },
      { id: 'adv-3', name: 'Cable Chest Flyes', targetMuscle: 'Lower Chest', sets: 4, reps: '10-12', restTime: 60, suggestedWeight: 18, completed: false },
      { id: 'adv-4', name: 'Dips', targetMuscle: 'Lower Chest & Triceps', sets: 4, reps: '10-12 (Weighted)', restTime: 90, suggestedWeight: 15, completed: false },
      { id: 'adv-5', name: 'Skull Crushers', targetMuscle: 'Triceps', sets: 4, reps: '8-10', restTime: 75, suggestedWeight: 35, completed: false },
      { id: 'adv-6', name: 'Triceps Rope Pushdowns', targetMuscle: 'Triceps', sets: 3, reps: '12-15', restTime: 45, suggestedWeight: 28, completed: false }
    ]
  },
  {
    day: 'Tuesday',
    title: 'Heavy Back & Biceps (Advanced)',
    estimatedTime: 70,
    estimatedCalories: 560,
    exercises: [
      { id: 'adv-7', name: 'Bent-Over Barbell Rows', targetMuscle: 'Upper Back', sets: 5, reps: '6-8', restTime: 120, suggestedWeight: 75, completed: false },
      { id: 'adv-8', name: 'Lat Pulldowns', targetMuscle: 'Lats', sets: 4, reps: '8-10', restTime: 90, suggestedWeight: 70, completed: false },
      { id: 'adv-9', name: 'Seated Cable Rows', targetMuscle: 'Mid Back', sets: 4, reps: '10-12', restTime: 75, suggestedWeight: 60, completed: false },
      { id: 'adv-10', name: 'EZ-Bar Bicep Curls', targetMuscle: 'Biceps', sets: 4, reps: '8-10', restTime: 60, suggestedWeight: 30, completed: false },
      { id: 'adv-11', name: 'Preacher Curls', targetMuscle: 'Biceps Peak', sets: 3, reps: '10-12', restTime: 60, suggestedWeight: 26, completed: false },
      { id: 'adv-12', name: 'Hammer Curls', targetMuscle: 'Brachialis', sets: 3, reps: '12-15', restTime: 45, suggestedWeight: 18, completed: false }
    ]
  },
  {
    day: 'Wednesday',
    title: 'Heavy Legs & Posterior Chain (Advanced)',
    estimatedTime: 75,
    estimatedCalories: 640,
    exercises: [
      { id: 'adv-13', name: 'Barbell Back Squats', targetMuscle: 'Quadriceps', sets: 5, reps: '5-7', restTime: 180, suggestedWeight: 110, completed: false },
      { id: 'adv-14', name: 'Romanian Deadlifts', targetMuscle: 'Hamstrings', sets: 4, reps: '8-10', restTime: 120, suggestedWeight: 90, completed: false },
      { id: 'adv-15', name: 'Leg Press', targetMuscle: 'Quads & Glutes', sets: 4, reps: '10-12', restTime: 90, suggestedWeight: 180, completed: false },
      { id: 'adv-16', name: 'Standing Calf Raises', targetMuscle: 'Calves', sets: 5, reps: '12-15', restTime: 45, suggestedWeight: 60, completed: false },
      { id: 'adv-17', name: 'Hanging Leg Raises', targetMuscle: 'Lower Abs', sets: 4, reps: '15', restTime: 45, suggestedWeight: 5, completed: false }
    ]
  },
  {
    day: 'Thursday',
    title: 'Overhead Press & Shoulders (Advanced)',
    estimatedTime: 60,
    estimatedCalories: 480,
    exercises: [
      { id: 'adv-18', name: 'Overhead Barbell Press', targetMuscle: 'Deltoids', sets: 4, reps: '6-8', restTime: 120, suggestedWeight: 50, completed: false },
      { id: 'adv-19', name: 'Overhead Dumbbell Press', targetMuscle: 'Deltoids', sets: 4, reps: '8-10', restTime: 90, suggestedWeight: 26, completed: false },
      { id: 'adv-20', name: 'Lateral Cable Raises', targetMuscle: 'Side Delts', sets: 4, reps: '12-15', restTime: 45, suggestedWeight: 12, completed: false },
      { id: 'adv-21', name: 'Face Pulls', targetMuscle: 'Rear Delts', sets: 4, reps: '15', restTime: 45, suggestedWeight: 24, completed: false }
    ]
  },
  {
    day: 'Friday',
    title: 'Max Power Deadlift & Full Body (Advanced)',
    estimatedTime: 65,
    estimatedCalories: 580,
    exercises: [
      { id: 'adv-22', name: 'Conventional Deadlift', targetMuscle: 'Posterior Chain', sets: 5, reps: '3-5', restTime: 180, suggestedWeight: 140, completed: false },
      { id: 'adv-23', name: 'Dumbbell Walking Lunges', targetMuscle: 'Quads & Glutes', sets: 4, reps: '12 per leg', restTime: 75, suggestedWeight: 20, completed: false },
      { id: 'adv-24', name: 'Push-Ups to Renegade Row', targetMuscle: 'Full Body', sets: 4, reps: '10', restTime: 60, suggestedWeight: 18, completed: false },
      { id: 'adv-25', name: 'Ab Wheel Rollouts', targetMuscle: 'Abs', sets: 4, reps: '15', restTime: 45, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Saturday',
    title: 'Arms & Core Hypertrophy (Advanced)',
    estimatedTime: 50,
    estimatedCalories: 420,
    exercises: [
      { id: 'adv-26', name: 'EZ-Bar Bicep Curls', targetMuscle: 'Biceps', sets: 4, reps: '10-12', restTime: 60, suggestedWeight: 26, completed: false },
      { id: 'adv-27', name: 'Overhead Tricep Extensions', targetMuscle: 'Long Head Triceps', sets: 4, reps: '10-12', restTime: 60, suggestedWeight: 24, completed: false },
      { id: 'adv-28', name: 'Hammer Curls', targetMuscle: 'Brachialis', sets: 3, reps: '12-15', restTime: 45, suggestedWeight: 16, completed: false },
      { id: 'adv-29', name: 'Plank Hold', targetMuscle: 'Core', sets: 4, reps: '75 sec', restTime: 45, suggestedWeight: 0, completed: false }
    ]
  },
  {
    day: 'Sunday',
    title: 'Rest & Active Recovery',
    estimatedTime: 25,
    estimatedCalories: 120,
    exercises: [
      { id: 'adv-30', name: 'Full Body Dynamic Stretching', targetMuscle: 'Mobility', sets: 1, reps: '15 min', restTime: 0, suggestedWeight: 0, completed: false },
      { id: 'adv-31', name: 'Foam Rolling Major Muscles', targetMuscle: 'Recovery', sets: 1, reps: '10 min', restTime: 0, suggestedWeight: 0, completed: false }
    ]
  }
];

function generateWorkoutPlanForUser(user) {
  const level = resolveExperienceLevel(user.trainingDuration, user.experienceLevel);

  let selectedSet = intermediateWorkouts;
  if (level === 'Beginner') {
    selectedSet = beginnerWorkouts;
  } else if (level === 'Advanced') {
    selectedSet = advancedWorkouts;
  }

  // Attach metadata level information to each day
  return selectedSet.map(w => ({
    ...w,
    experienceLevel: level
  }));
}

function generateNutritionPlanForUser(user, dateStr) {
  const calories = user.targets?.calories || 2200;
  const protein = user.targets?.protein || 165;
  const carbs = user.targets?.carbs || 220;
  const fat = user.targets?.fat || 65;

  const isVeg = user.dietType === 'Vegetarian';
  const isVegan = user.dietType === 'Vegan';

  const breakfastItem = isVegan
    ? { id: 'food-1', name: 'Oatmeal with Almond Milk, Chia & Peanut Butter', quantity: '1 Large Bowl', calories: 480, protein: 22, carbs: 64, fat: 16, eaten: true }
    : isVeg
    ? { id: 'food-1', name: 'Oats + Banana + Scoop Whey Protein', quantity: '1 Bowl (80g Oats)', calories: 520, protein: 38, carbs: 67, fat: 12, eaten: true }
    : { id: 'food-1', name: 'Egg White Omelette with Toast & Avocado', quantity: '4 Eggs + 2 Slices Whole Wheat', calories: 510, protein: 36, carbs: 42, fat: 18, eaten: true };

  const lunchItem = isVegan
    ? { id: 'food-2', name: 'Brown Rice with Tofu Stir-Fry & Broccoli', quantity: '1.5 Cups Rice + 180g Tofu', calories: 580, protein: 32, carbs: 76, fat: 16, eaten: true }
    : isVeg
    ? { id: 'food-2', name: 'Grilled Paneer Salad with Quinoa & Brown Rice', quantity: '150g Paneer + 1 Cup Quinoa', calories: 610, protein: 35, carbs: 58, fat: 24, eaten: true }
    : { id: 'food-2', name: 'Grilled Chicken Breast with Brown Rice & Steamed Veggies', quantity: '180g Chicken + 1.5 Cups Rice', calories: 630, protein: 52, carbs: 65, fat: 14, eaten: true };

  const snackItem = { id: 'food-3', name: 'Greek Yogurt with Mixed Berries & Almonds', quantity: '200g Yogurt + 30g Almonds', calories: 310, protein: 24, carbs: 28, fat: 10, eaten: false };

  const dinnerItem = isVegan
    ? { id: 'food-4', name: 'Lentil Curry (Dal) with Sweet Potato & Spinach', quantity: '2 Bowls Lentils + 1 Sweet Potato', calories: 540, protein: 28, carbs: 82, fat: 10, eaten: false }
    : isVeg
    ? { id: 'food-4', name: 'Soya Chunk Curry with Brown Rice & Salad', quantity: '100g Soya + 1 Cup Rice', calories: 530, protein: 46, carbs: 60, fat: 10, eaten: false }
    : { id: 'food-4', name: 'Pan-Seared Salmon or Grilled Chicken with Asparagus', quantity: '180g Fish + Veggies', calories: 560, protein: 45, carbs: 18, fat: 28, eaten: false };

  return {
    date: dateStr || new Date().toISOString().split('T')[0],
    calorieTarget: calories,
    proteinTarget: protein,
    carbTarget: carbs,
    fatTarget: fat,
    waterLogged: 2.1,
    meals: [
      {
        mealType: 'Breakfast',
        name: 'Morning Fuel',
        items: [breakfastItem],
        totalCalories: breakfastItem.calories,
        totalProtein: breakfastItem.protein,
        totalCarbs: breakfastItem.carbs,
        totalFat: breakfastItem.fat
      },
      {
        mealType: 'Lunch',
        name: 'Midday Lean Meal',
        items: [lunchItem],
        totalCalories: lunchItem.calories,
        totalProtein: lunchItem.protein,
        totalCarbs: lunchItem.carbs,
        totalFat: lunchItem.fat
      },
      {
        mealType: 'Snack',
        name: 'Pre-Workout / Afternoon Snack',
        items: [snackItem],
        totalCalories: snackItem.calories,
        totalProtein: snackItem.protein,
        totalCarbs: snackItem.carbs,
        totalFat: snackItem.fat
      },
      {
        mealType: 'Dinner',
        name: 'Post-Workout Recovery Dinner',
        items: [dinnerItem],
        totalCalories: dinnerItem.calories,
        totalProtein: dinnerItem.protein,
        totalCarbs: dinnerItem.carbs,
        totalFat: dinnerItem.fat
      }
    ]
  };
}

async function answerAiCoachQuery(user, prompt) {
  const p = prompt.toLowerCase();
  const level = resolveExperienceLevel(user.trainingDuration, user.experienceLevel);
  const goal = user.fitnessGoal || 'Build Muscle';
  const weight = user.weight || 83;
  const name = user.name || 'Athlete';
  const calories = user.targets?.calories || 2200;
  const protein = user.targets?.protein || 165;

  if (p.includes('eat before my workout') || p.includes('pre-workout')) {
    return `Hey ${name}! For optimal performance before your workout:
- **Timing:** Eat 45–60 minutes before training.
- **Carbs & Fast Protein:** Opt for 30–40g of easily digestible carbs and 15–20g protein.
- **Recommendation:** A banana with a scoop of whey or 2 slices of whole-grain toast with almond butter.
This ensures your muscle glycogen stores are topped off without causing stomach discomfort during lifts.`;
  }

  if (p.includes('missed yesterday') || p.includes('missed workout')) {
    return `Don't sweat it, ${name}! Consistency is built over months, not single days.
1. Do NOT double up workouts today.
2. Continue with today's scheduled workout for your **${level} Level**.
3. Keep your hydration at **${user.targets?.water || 3.2}L** and stay on track with your **${calories} kcal** target today!`;
  }

  return `Based on your profile (**${weight}kg**, Level: **${level}**, Goal: **${goal}**), here is my advice:
Your current daily target is **${calories} kcal** and **${protein}g protein**.
- Keep focusing on controlled technique and progressive overload.
- Log your completed weights to auto-calculate your next workout progression!`;
}

function generateWeeklyReport(user, historicalData) {
  const level = resolveExperienceLevel(user.trainingDuration, user.experienceLevel);
  return {
    weekRange: 'Week 8 (Sep 21 - Sep 27)',
    workoutsCompleted: level === 'Beginner' ? 3 : (level === 'Intermediate' ? 4 : 5),
    workoutsTotal: level === 'Beginner' ? 4 : (level === 'Intermediate' ? 5 : 6),
    dietConsistency: 86,
    avgCalories: 2180,
    targetCalories: user.targets?.calories || 2200,
    avgProtein: 148,
    targetProtein: user.targets?.protein || 165,
    avgSteps: 8420,
    targetSteps: user.targets?.steps || 10000,
    weightChange: -0.6,
    currentWeight: user.weight || 80.8,
    startWeight: 83.0,
    targetWeight: user.targetWeight || 75.0,
    aiRecommendation: `Your progress is remarkably consistent for your ${level} plan! You dropped 0.6 kg this week while retaining strength.`
  };
}

module.exports = {
  resolveExperienceLevel,
  getLevelGuidance,
  generateWorkoutPlanForUser,
  generateNutritionPlanForUser,
  answerAiCoachQuery,
  generateWeeklyReport
};
