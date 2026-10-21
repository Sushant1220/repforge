const mongoose = require('mongoose');

const WeightLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  date: { type: String, required: true }, // YYYY-MM-DD
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('WeightLog', WeightLogSchema);
