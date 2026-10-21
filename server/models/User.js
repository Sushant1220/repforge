const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  
  // Onboarding Info
  age: { type: Number, default: 26 },
  gender: { type: String, default: 'Male' },
  height: { type: Number, default: 178 },
  heightUnit: { type: String, default: 'cm' },
  weight: { type: Number, default: 83 },
  weightUnit: { type: String, default: 'kg' },
  targetWeight: { type: Number, default: 75 },
  
  fitnessGoal: { type: String, default: 'Build Muscle' }, // Lose Weight, Build Muscle, Maintain Weight, Gain Weight, Improve Fitness
  activityLevel: { type: String, default: 'Moderately Active' },
  experienceLevel: { type: String, default: 'Intermediate' },
  workoutLocation: { type: String, default: 'Gym' },
  workoutDaysPerWeek: { type: Number, default: 5 },
  workoutDuration: { type: String, default: '60 minutes' },
  preferredTime: { type: String, default: 'Morning' },
  
  dietType: { type: String, default: 'Non-Vegetarian' }, // Vegetarian, Non-Vegetarian, Vegan, Eggetarian
  mealsPerDay: { type: Number, default: 4 },
  allergies: [{ type: String }],
  medicalNotes: { type: String, default: '' },
  
  onboardingCompleted: { type: Boolean, default: false },
  
  // Dynamic Calculated Targets
  targets: {
    bmiScore: Number,
    bmiCategory: String,
    bmr: Number,
    tdee: Number,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    water: Number,
    steps: Number,
    sleep: Number
  },
  
  streakCount: { type: Number, default: 12 },
  lastActiveDate: { type: Date, default: Date.now }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
