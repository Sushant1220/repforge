const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  badgeIcon: { type: String, required: true }, // lucide icon identifier or emoji
  unlocked: { type: Boolean, default: false },
  unlockedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
