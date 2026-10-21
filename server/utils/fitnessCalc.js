/**
 * Fitness Calculations Engine for FitForge AI
 */

function calculateFitnessTargets(user) {
  let weightKg = parseFloat(user.weight) || 75;
  if (user.weightUnit === 'lbs') {
    weightKg = weightKg * 0.453592;
  }

  let heightCm = parseFloat(user.height) || 175;
  if (user.heightUnit === 'ft') {
    // e.g. 5.9 ft -> ~180 cm
    heightCm = heightCm * 30.48;
  }

  let age = parseInt(user.age, 10) || 25;
  let gender = user.gender ? user.gender.toLowerCase() : 'male';

  // 1. BMI Calculation
  const heightM = heightCm / 100;
  const bmiScore = +(weightKg / (heightM * heightM)).toFixed(1);

  let bmiCategory = 'Normal';
  if (bmiScore < 18.5) bmiCategory = 'Underweight';
  else if (bmiScore >= 18.5 && bmiScore <= 24.9) bmiCategory = 'Normal';
  else if (bmiScore >= 25 && bmiScore <= 29.9) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  // 2. BMR (Mifflin-St Jeor Equation)
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (gender === 'female' || gender === 'woman') {
    bmr -= 161;
  } else if (gender === 'male' || gender === 'man') {
    bmr += 5;
  } else {
    bmr -= 78;
  }
  bmr = Math.round(bmr);

  // 3. TDEE (Total Daily Energy Expenditure)
  const activityMultipliers = {
    'Sedentary': 1.2,
    'Lightly Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725,
    'Extremely Active': 1.9
  };

  const mult = activityMultipliers[user.activityLevel] || 1.4;
  const tdee = Math.round(bmr * mult);

  // 4. Goal Calories
  let goalCalories = tdee;
  const goal = user.fitnessGoal || 'Maintain Weight';

  if (goal === 'Lose Weight' || goal === 'Fat Loss') {
    goalCalories = Math.max(1400, tdee - 500);
  } else if (goal === 'Gain Weight' || goal === 'Build Muscle') {
    goalCalories = tdee + 350;
  } else {
    goalCalories = tdee;
  }
  goalCalories = Math.round(goalCalories);

  // 5. Macronutrients Calculation
  // Protein: ~2g per kg for muscle building / weight loss preservation
  let proteinGrams = Math.round(weightKg * (goal === 'Build Muscle' ? 2.2 : 2.0));
  if (proteinGrams * 4 > goalCalories * 0.4) {
    proteinGrams = Math.round((goalCalories * 0.35) / 4);
  }

  // Fat: 25% of total calories (9 kcal/g)
  let fatGrams = Math.round((goalCalories * 0.25) / 9);

  // Carbs: Remaining calories (4 kcal/g)
  const proteinCalories = proteinGrams * 4;
  const fatCalories = fatGrams * 9;
  const carbCalories = Math.max(200, goalCalories - proteinCalories - fatCalories);
  let carbGrams = Math.round(carbCalories / 4);

  // 6. Recommended Water Intake (Litres)
  // ~35ml per kg body weight + 0.5L for active days
  let waterLiters = +((weightKg * 0.035) + 0.5).toFixed(1);
  if (waterLiters < 2.5) waterLiters = 2.5;

  // 7. Step Goal
  let stepGoal = 10000;
  if (user.activityLevel === 'Sedentary') stepGoal = 8000;
  else if (user.activityLevel === 'Lightly Active') stepGoal = 9000;
  else if (user.activityLevel === 'Moderately Active') stepGoal = 10000;
  else stepGoal = 12000;

  // 8. Sleep Recommendation
  const sleepHours = 8.0;

  return {
    bmiScore,
    bmiCategory,
    bmr,
    tdee,
    calories: goalCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
    water: waterLiters,
    steps: stepGoal,
    sleep: sleepHours
  };
}

module.exports = {
  calculateFitnessTargets
};
