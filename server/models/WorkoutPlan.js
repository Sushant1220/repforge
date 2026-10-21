const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  targetMuscle: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
  restTime: { type: Number, default: 90 }, // seconds
  suggestedWeight: { type: Number, default: 40 }, // kg
  completed: { type: Boolean, default: false },
  image: { type: String },
  completedSets: [{
    setNum: Number,
    weight: Number,
    reps: Number,
    completed: Boolean
  }]
});

const WorkoutPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true }, // Monday, Tuesday...
  title: { type: String, required: true }, // e.g. Chest & Triceps
  estimatedTime: { type: Number, default: 55 }, // minutes
  estimatedCalories: { type: Number, default: 420 },
  exercises: [ExerciseSchema],
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
