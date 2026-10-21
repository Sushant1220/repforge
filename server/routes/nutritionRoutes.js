const express = require('express');
const router = express.Router();
const { NutritionPlanStore } = require('../config/dbStore');
const { protect } = require('../middleware/auth');
const { generateNutritionPlanForUser } = require('../utils/aiGenerator');

// Sample searchable food database
const foodDatabase = [
  { id: 'f-1', name: 'White Rice (Cooked)', portion: '1 Cup (158g)', calories: 206, protein: 4.3, carbs: 45, fat: 0.4 },
  { id: 'f-2', name: 'Brown Rice (Cooked)', portion: '1 Cup (195g)', calories: 216, protein: 5.0, carbs: 45, fat: 1.8 },
  { id: 'f-3', name: 'Basmati Rice (Cooked)', portion: '1 Cup (160g)', calories: 205, protein: 4.2, carbs: 44, fat: 0.5 },
  { id: 'f-4', name: 'Chicken Breast (Grilled)', portion: '100g', calories: 165, protein: 31.0, carbs: 0, fat: 3.6 },
  { id: 'f-5', name: 'Paneer (Low-Fat Cottage Cheese)', portion: '100g', calories: 180, protein: 18.0, carbs: 3.5, fat: 10.0 },
  { id: 'f-6', name: 'Tofu (Firm)', portion: '100g', calories: 83, protein: 10.0, carbs: 2.0, fat: 5.0 },
  { id: 'f-7', name: 'Whole Eggs (Boiled)', portion: '2 Large Eggs', calories: 155, protein: 13.0, carbs: 1.1, fat: 10.6 },
  { id: 'f-8', name: 'Egg Whites', portion: '4 Whites (132g)', calories: 68, protein: 14.4, carbs: 0.9, fat: 0.2 },
  { id: 'f-9', name: 'Soya Chunks (Dry)', portion: '50g', calories: 172, protein: 26.0, carbs: 16.5, fat: 0.4 },
  { id: 'f-10', name: 'Whey Protein Isolate', portion: '1 Scoop (30g)', calories: 120, protein: 25.0, carbs: 2.0, fat: 1.0 },
  { id: 'f-11', name: 'Oats (Rolled)', portion: '50g', calories: 190, protein: 6.5, carbs: 33.0, fat: 3.5 },
  { id: 'f-12', name: 'Banana', portion: '1 Medium (118g)', calories: 105, protein: 1.3, carbs: 27.0, fat: 0.3 },
  { id: 'f-13', name: 'Salmon (Pan-Seared)', portion: '150g', calories: 310, protein: 34.0, carbs: 0, fat: 18.0 },
  { id: 'f-14', name: 'Greek Yogurt (Plain 0%)', portion: '200g', calories: 120, protein: 20.0, carbs: 8.0, fat: 0.4 },
  { id: 'f-15', name: 'Almonds (Raw)', portion: '30g (approx 23 nuts)', calories: 170, protein: 6.0, carbs: 6.0, fat: 15.0 },
  { id: 'f-16', name: 'Sweet Potato (Baked)', portion: '1 Medium (150g)', calories: 135, protein: 3.0, carbs: 31.0, fat: 0.2 }
];

// Food replacement lookup table
const foodReplacements = {
  'Chicken Breast': [
    { name: 'Paneer (Low-Fat)', portion: '150g', calories: 270, protein: 27, carbs: 5, fat: 15, note: 'Vegetarian alternative' },
    { name: 'Firm Tofu', portion: '200g', calories: 166, protein: 20, carbs: 4, fat: 10, note: 'Vegan alternative' },
    { name: 'Whole Eggs & Whites', portion: '2 Eggs + 3 Whites', calories: 205, protein: 24, carbs: 2, fat: 11, note: 'Eggetarian alternative' },
    { name: 'Soya Chunks', portion: '60g Dry', calories: 206, protein: 31, carbs: 19, fat: 0.5, note: 'High protein plant option' },
    { name: 'White Fish (Tilapia/Cod)', portion: '180g', calories: 175, protein: 36, carbs: 0, fat: 3, note: 'Lean seafood' }
  ],
  'Oats + Banana + Whey': [
    { name: 'Greek Yogurt Parfait + Granola', portion: '1 Bowl', calories: 480, protein: 32, carbs: 60, fat: 12, note: 'Refreshing morning option' },
    { name: 'Tofu Scramble with Whole Wheat Toast', portion: '1 Plate', calories: 450, protein: 28, carbs: 52, fat: 14, note: 'Vegan savoury breakfast' },
    { name: 'Paneer Stuffed Paratha + Curd', portion: '1 Paratha (150g)', calories: 510, protein: 25, carbs: 58, fat: 18, note: 'Traditional vegetarian' }
  ]
};

// @route GET /api/nutrition
router.get('/', protect, async (req, res) => {
  try {
    const todayStr = req.query.date || new Date().toISOString().split('T')[0];
    let nutrition = await NutritionPlanStore.findOne({ userId: req.user._id, date: todayStr });

    if (!nutrition) {
      const nutritionData = generateNutritionPlanForUser(req.user, todayStr);
      nutrition = await NutritionPlanStore.create({
        userId: req.user._id,
        ...nutritionData
      });
    }

    res.json(nutrition);
  } catch (error) {
    console.error('Fetch nutrition error:', error);
    res.status(500).json({ message: 'Server error fetching nutrition plan' });
  }
});

// @route PUT /api/nutrition/toggle-item
router.put('/toggle-item', protect, async (req, res) => {
  try {
    const { date, mealType, itemId } = req.body;
    const todayStr = date || new Date().toISOString().split('T')[0];
    const nutrition = await NutritionPlanStore.findOne({ userId: req.user._id, date: todayStr });

    if (!nutrition) return res.status(404).json({ message: 'Nutrition plan not found' });

    const meal = nutrition.meals.find(m => m.mealType === mealType);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    const item = meal.items.find(i => i.id === itemId || i._id === itemId || String(i.id) === String(itemId) || String(i._id) === String(itemId));
    if (!item) return res.status(404).json({ message: 'Food item not found' });

    item.eaten = !item.eaten;
    await nutrition.save();

    res.json(nutrition);
  } catch (error) {
    console.error('Toggle nutrition item error:', error);
    res.status(500).json({ message: 'Server error updating meal item' });
  }
});

// @route GET /api/nutrition/search-food
router.get('/search-food', protect, async (req, res) => {
  try {
    const query = (req.query.q || '').toLowerCase();
    const results = foodDatabase.filter(f => f.name.toLowerCase().includes(query) || f.portion.toLowerCase().includes(query));
    res.json(results.length > 0 ? results : foodDatabase.slice(0, 8));
  } catch (error) {
    res.status(500).json({ message: 'Server error searching food' });
  }
});

// @route GET /api/nutrition/replacements
router.get('/replacements', protect, async (req, res) => {
  try {
    const itemName = req.query.name || 'Chicken Breast';
    const matches = Object.keys(foodReplacements).find(key => itemName.toLowerCase().includes(key.toLowerCase()));
    const alternatives = matches ? foodReplacements[matches] : foodReplacements['Chicken Breast'];
    res.json({ original: itemName, alternatives });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching food replacements' });
  }
});

// @route POST /api/nutrition/replace-food
router.post('/replace-food', protect, async (req, res) => {
  try {
    const { date, mealType, itemId, newItem } = req.body;
    const todayStr = date || new Date().toISOString().split('T')[0];
    const nutrition = await NutritionPlanStore.findOne({ userId: req.user._id, date: todayStr });

    if (!nutrition) return res.status(404).json({ message: 'Nutrition plan not found' });

    const meal = nutrition.meals.find(m => m.mealType === mealType);
    if (!meal) return res.status(404).json({ message: 'Meal not found' });

    const itemIndex = meal.items.findIndex(i => i.id === itemId || i._id === itemId || String(i.id) === String(itemId) || String(i._id) === String(itemId));
    if (itemIndex !== -1) {
      meal.items[itemIndex] = {
        id: `food-replaced-${Date.now()}`,
        name: newItem.name,
        quantity: newItem.portion || '1 Portion',
        calories: Number(newItem.calories),
        protein: Number(newItem.protein),
        carbs: Number(newItem.carbs),
        fat: Number(newItem.fat),
        eaten: true
      };

      meal.totalCalories = meal.items.reduce((acc, i) => acc + i.calories, 0);
      meal.totalProtein = meal.items.reduce((acc, i) => acc + i.protein, 0);
      meal.totalCarbs = meal.items.reduce((acc, i) => acc + i.carbs, 0);
      meal.totalFat = meal.items.reduce((acc, i) => acc + i.fat, 0);
    }

    await nutrition.save();
    res.json(nutrition);
  } catch (error) {
    console.error('Replace food error:', error);
    res.status(500).json({ message: 'Server error replacing food item' });
  }
});

// @route POST /api/nutrition/add-food
router.post('/add-food', protect, async (req, res) => {
  try {
    const { date, mealType, foodItem, servings } = req.body;
    const todayStr = date || new Date().toISOString().split('T')[0];
    let nutrition = await NutritionPlanStore.findOne({ userId: req.user._id, date: todayStr });

    if (!nutrition) {
      const nutritionData = generateNutritionPlanForUser(req.user, todayStr);
      nutrition = await NutritionPlanStore.create({
        userId: req.user._id,
        ...nutritionData
      });
    }

    let meal = nutrition.meals.find(m => m.mealType === mealType);
    if (!meal) {
      nutrition.meals.push({
        mealType,
        name: mealType,
        items: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0
      });
      meal = nutrition.meals[nutrition.meals.length - 1];
    }

    const mult = parseFloat(servings) || 1;
    meal.items.push({
      id: `food-add-${Date.now()}`,
      name: foodItem.name,
      quantity: `${mult}x (${foodItem.portion})`,
      calories: Math.round(foodItem.calories * mult),
      protein: Math.round(foodItem.protein * mult),
      carbs: Math.round(foodItem.carbs * mult),
      fat: Math.round(foodItem.fat * mult),
      eaten: true
    });

    meal.totalCalories = meal.items.reduce((acc, i) => acc + i.calories, 0);
    meal.totalProtein = meal.items.reduce((acc, i) => acc + i.protein, 0);
    meal.totalCarbs = meal.items.reduce((acc, i) => acc + i.carbs, 0);
    meal.totalFat = meal.items.reduce((acc, i) => acc + i.fat, 0);

    await nutrition.save();
    res.json(nutrition);
  } catch (error) {
    console.error('Add food error:', error);
    res.status(500).json({ message: 'Server error adding food item' });
  }
});

// @route POST /api/nutrition/water
router.post('/water', protect, async (req, res) => {
  try {
    const { amountLiters, date } = req.body;
    const todayStr = date || new Date().toISOString().split('T')[0];
    let nutrition = await NutritionPlanStore.findOne({ userId: req.user._id, date: todayStr });

    if (!nutrition) {
      const nutritionData = generateNutritionPlanForUser(req.user, todayStr);
      nutrition = await NutritionPlanStore.create({
        userId: req.user._id,
        ...nutritionData
      });
    }

    nutrition.waterLogged = +((nutrition.waterLogged || 0) + Number(amountLiters)).toFixed(2);
    await nutrition.save();

    res.json({
      waterLogged: nutrition.waterLogged,
      waterTarget: req.user.targets?.water || 3.2
    });
  } catch (error) {
    console.error('Water log error:', error);
    res.status(500).json({ message: 'Server error logging water' });
  }
});

module.exports = router;
