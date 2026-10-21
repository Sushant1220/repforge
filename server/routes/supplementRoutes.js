const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { UserStore } = require('../config/dbStore');

// Verified Supplement Catalog (Indian Rupee Pricing ₹)
const supplementCatalog = [
  // 1. Protein Powders
  {
    id: 'supp-1',
    name: 'Gold Standard 100% Whey Protein',
    brand: 'Optimum Nutrition (ON)',
    category: 'Whey Protein',
    price: 3299,
    size: '1 kg (2.2 lbs)',
    servings: 30,
    proteinPerServing: 24,
    rating: 4.8,
    costPerServing: 110,
    diet: 'Vegetarian',
    goalTags: ['Muscle Gain', 'Strength', 'Weight Loss', 'General Fitness'],
    badge: '1. Most Relevant',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&auto=format&fit=crop&q=80',
    mainBenefit: 'Fast-absorbing whey isolate for muscle repair and protein intake.',
    ingredients: ['Whey Protein Isolate', 'Whey Concentrate', 'Natural Flavors'],
    whoFor: 'Anyone aiming to increase daily protein intake for muscle building or fat loss.',
    safetyNote: 'Contains milk/dairy. Drink plenty of water throughout the day.'
  },
  {
    id: 'supp-2',
    name: 'Biozyme Performance Whey',
    brand: 'MuscleBlaze',
    category: 'Whey Protein',
    price: 2499,
    size: '1 kg (2.2 lbs)',
    servings: 28,
    proteinPerServing: 25,
    rating: 4.7,
    costPerServing: 89,
    diet: 'Vegetarian',
    goalTags: ['Muscle Gain', 'Strength'],
    badge: '1. Most Relevant',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&auto=format&fit=crop&q=80',
    mainBenefit: 'Enhanced with digestive enzymes for 50% higher protein absorption.',
    ingredients: ['Whey Protein Concentrate', 'EOR Digestive Enzyme Blend', 'Cocoa Powder'],
    whoFor: 'Active individuals seeking optimal protein digestion without bloating.',
    safetyNote: 'Tested for heavy metals and certified for accuracy.'
  },
  {
    id: 'supp-[#3]',
    id: 'supp-3',
    name: 'Plant Protein Organic Isolate',
    brand: 'Cosmix / Oziva',
    category: 'Plant Protein',
    price: 2199,
    size: '1 kg (2.2 lbs)',
    servings: 30,
    proteinPerServing: 23,
    rating: 4.6,
    costPerServing: 73,
    diet: 'Vegan',
    goalTags: ['Muscle Gain', 'Weight Loss', 'General Fitness'],
    badge: '1. Most Relevant',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&auto=format&fit=crop&q=80',
    mainBenefit: '100% plant-based pea & brown rice protein, dairy-free & easy on stomach.',
    ingredients: ['Pea Protein Isolate', 'Organic Brown Rice Protein', 'Natural Vanilla Extract'],
    whoFor: 'Vegans, lactose-intolerant individuals, or plant-based athletes.',
    safetyNote: 'Soy-free, gluten-free, and 100% vegan certified.'
  },

  // 2. Creatine
  {
    id: 'supp-4',
    name: 'Creatine Monohydrate Unflavored',
    brand: 'MuscleBlaze / AsItIs',
    category: 'Creatine',
    price: 899,
    size: '250 g',
    servings: 83,
    proteinPerServing: 0,
    rating: 4.9,
    costPerServing: 11,
    diet: 'Vegan',
    goalTags: ['Muscle Gain', 'Strength'],
    badge: '2. Good Option',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
    mainBenefit: 'Boosts muscle strength, explosive power, and workout endurance.',
    ingredients: ['100% Pure Micronized Creatine Monohydrate'],
    whoFor: 'Lifters looking to increase bench press, squat power, and muscle volume.',
    safetyNote: 'Take 3-5g daily. Stay well hydrated throughout the day.'
  },
  {
    id: 'supp-5',
    name: 'Micronized Creatine Drive',
    brand: 'Nutrex Research',
    category: 'Creatine',
    price: 1199,
    size: '300 g',
    servings: 60,
    proteinPerServing: 0,
    rating: 4.8,
    costPerServing: 20,
    diet: 'Vegan',
    goalTags: ['Strength', 'Muscle Gain'],
    badge: '2. Good Option',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop&q=80',
    mainBenefit: 'Ultrapure micronized powder for fast solubility and muscle energy.',
    ingredients: ['Pure Micronized Creatine Monohydrate'],
    whoFor: 'Strength athletes and bodybuilders seeking maximum ATP replenishment.',
    safetyNote: 'Mix with water or fruit juice after workout.'
  },

  // 3. Electrolytes & Intra-Workout
  {
    id: 'supp-6',
    name: 'Hydration Electrolyte & BCAA Spark',
    brand: 'Fast&Up / Scivation',
    category: 'Electrolytes',
    price: 499,
    size: '20 Effervescent Tablets',
    servings: 20,
    proteinPerServing: 0,
    rating: 4.7,
    costPerServing: 25,
    diet: 'Vegan',
    goalTags: ['General Fitness', 'Weight Loss', 'Muscle Gain', 'Strength'],
    badge: '3. Optional',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&auto=format&fit=crop&q=80',
    mainBenefit: 'Replaces essential minerals lost in sweat to prevent muscle cramps.',
    ingredients: ['Sodium', 'Potassium', 'Magnesium', 'Vitamin C', 'B-Complex'],
    whoFor: 'Anyone exercising in warm weather or sweating heavily during workouts.',
    safetyNote: 'Drop 1 tablet in 250ml water and consume during training.'
  },

  // 4. Weight Gain / Mass Gainer
  {
    id: 'supp-7',
    name: 'High Calorie Clean Mass Gainer',
    brand: 'Labrada Muscle Mass',
    category: 'Mass Gainer',
    price: 2899,
    size: '1.5 kg (3.3 lbs)',
    servings: 15,
    proteinPerServing: 52,
    rating: 4.6,
    costPerServing: 193,
    diet: 'Vegetarian',
    goalTags: ['Weight Gain', 'Muscle Gain'],
    badge: '1. Most Relevant',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ca?w=400&auto=format&fit=crop&q=80',
    mainBenefit: 'Provides 1,200 clean calories to help hardgainers put on size.',
    ingredients: ['Complex Carbohydrate Blend', 'Whey Concentrate', 'MCT Oil Powder'],
    whoFor: 'Individuals struggling to consume enough calories through solid food.',
    safetyNote: 'High calorie content. Start with half serving daily.'
  },

  // 5. Daily Wellness & Multivitamins
  {
    id: 'supp-8',
    name: 'Daily Active Multivitamin & Minerals',
    brand: 'TrueBasics / HK Vitals',
    category: 'Multivitamin',
    price: 699,
    size: '60 Capsules',
    servings: 60,
    proteinPerServing: 0,
    rating: 4.7,
    costPerServing: 11,
    diet: 'Vegetarian',
    goalTags: ['General Fitness', 'Weight Loss', 'Muscle Gain', 'Strength', 'Weight Gain'],
    badge: '3. Optional',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80',
    mainBenefit: 'Fills micronutrient gaps, supports immunity, and reduces daily fatigue.',
    ingredients: ['23 Essential Vitamins & Minerals', 'Ginseng', 'Ashwagandha Extract'],
    whoFor: 'Anyone looking to maintain baseline health, energy, and joint vitality.',
    safetyNote: 'Take 1 capsule daily after breakfast.'
  }
];

// Helper: Filter by budget, diet & goal
function getRecommendedStack(goal, budgetLimit, dietPref) {
  let filtered = supplementCatalog.filter(p => {
    // Diet check
    if (dietPref === 'Vegan' && p.diet !== 'Vegan') return false;
    if (dietPref === 'Vegetarian' && p.diet === 'Non-Vegetarian') return false;
    return true;
  });

  // Goal prioritizing logic
  let primaryCategory = 'Whey Protein';
  let secondaryCategory = 'Creatine';
  let tertiaryCategory = 'Electrolytes';

  if (goal === 'Weight Loss') {
    primaryCategory = dietPref === 'Vegan' ? 'Plant Protein' : 'Whey Protein';
    secondaryCategory = 'Electrolytes';
    tertiaryCategory = 'Multivitamin';
  } else if (goal === 'Weight Gain') {
    primaryCategory = 'Mass Gainer';
    secondaryCategory = 'Creatine';
    tertiaryCategory = 'Multivitamin';
  } else if (goal === 'Strength') {
    primaryCategory = 'Creatine';
    secondaryCategory = dietPref === 'Vegan' ? 'Plant Protein' : 'Whey Protein';
    tertiaryCategory = 'Electrolytes';
  } else if (goal === 'General Fitness') {
    primaryCategory = dietPref === 'Vegan' ? 'Plant Protein' : 'Whey Protein';
    secondaryCategory = 'Electrolytes';
    tertiaryCategory = 'Multivitamin';
  } else {
    // Muscle Gain
    primaryCategory = dietPref === 'Vegan' ? 'Plant Protein' : 'Whey Protein';
    secondaryCategory = 'Creatine';
    tertiaryCategory = 'Electrolytes';
  }

  // Pick best item fitting budget
  let stack = [];
  let currentTotal = 0;

  // 1. Primary Item
  const pItem = filtered.find(p => p.category === primaryCategory || p.category.includes('Protein')) || filtered[0];
  if (pItem && (currentTotal + pItem.price) <= budgetLimit) {
    stack.push({ ...pItem, badge: '1. Most Relevant' });
    currentTotal += pItem.price;
  }

  // 2. Secondary Item
  const sItem = filtered.find(p => p.category === secondaryCategory && !stack.some(s => s.id === p.id));
  if (sItem && (currentTotal + sItem.price) <= budgetLimit) {
    stack.push({ ...sItem, badge: '2. Good Option' });
    currentTotal += sItem.price;
  }

  // 3. Tertiary Item
  const tItem = filtered.find(p => (p.category === tertiaryCategory || p.category === 'Electrolytes' || p.category === 'Multivitamin') && !stack.some(s => s.id === p.id));
  if (tItem && (currentTotal + tItem.price) <= budgetLimit) {
    stack.push({ ...tItem, badge: '3. Optional' });
    currentTotal += tItem.price;
  }

  // If stack is still empty (budget very small, e.g. ₹800), pick highest relevant product <= budget
  if (stack.length === 0) {
    const singleFitted = filtered.filter(p => p.price <= budgetLimit).sort((a, b) => b.price - a.price)[0];
    if (singleFitted) {
      stack.push({ ...singleFitted, badge: '1. Most Relevant' });
      currentTotal += singleFitted.price;
    }
  }

  const budgetRemaining = Math.max(0, budgetLimit - currentTotal);

  return {
    stack,
    totalCost: currentTotal,
    budgetLimit,
    budgetRemaining,
    allMatchingProducts: filtered.filter(p => p.price <= budgetLimit)
  };
}

// @route POST /api/supplements/recommend
router.post('/recommend', protect, async (req, res) => {
  try {
    const { goal = 'Muscle Gain', budget = 5000, diet = 'No Preference' } = req.body;
    const numericBudget = parseInt(budget, 10) || 5000;

    const result = getRecommendedStack(goal, numericBudget, diet);

    res.json({
      goal,
      budget: numericBudget,
      diet,
      ...result,
      message: `This combination fits your ₹${numericBudget.toLocaleString()} budget and is aligned with your selected ${goal} goal.`
    });
  } catch (error) {
    console.error('Supplement recommendation error:', error);
    res.status(500).json({ message: 'Server error generating supplement recommendations' });
  }
});

// @route GET /api/supplements/catalog
router.get('/catalog', protect, async (req, res) => {
  res.json(supplementCatalog);
});

module.exports = router;
