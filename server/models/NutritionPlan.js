const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  eaten: { type: Boolean, default: false }
});

const MealSchema = new mongoose.Schema({
  mealType: { type: String, required: true }, // Breakfast, Lunch, Snack, Dinner
  name: { type: String, required: true },
  items: [FoodItemSchema],
  totalCalories: { type: Number, default: 0 },
  totalProtein: { type: Number, default: 0 },
  totalCarbs: { type: Number, default: 0 },
  totalFat: { type: Number, default: 0 }
});

const NutritionPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  calorieTarget: { type: Number, required: true },
  proteinTarget: { type: Number, required: true },
  carbTarget: { type: Number, required: true },
  fatTarget: { type: Number, required: true },
  waterLogged: { type: Number, default: 2.1 }, // Liters
  meals: [MealSchema]
}, { timestamps: true });

module.exports = mongoose.model('NutritionPlan', NutritionPlanSchema);
