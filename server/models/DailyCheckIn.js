const mongoose = require('mongoose');

const DailyCheckInSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  weight: { type: Number },
  workoutCompleted: { type: Boolean, default: false },
  dietFollowed: { type: Boolean, default: false },
  water: { type: Number, default: 0 },
  sleep: { type: Number, default: 8 },
  steps: { type: Number, default: 0 },
  energy: { type: Number, default: 7 }, // 1-10
  mood: { type: String, default: 'Good' }, // Excellent, Good, Average, Low
  score: { type: Number, default: 80 },
  recommendation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('DailyCheckIn', DailyCheckInSchema);
