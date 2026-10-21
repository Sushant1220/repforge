const mongoose = require('mongoose');

const MeasurementLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  chest: { type: Number },
  waist: { type: Number },
  arms: { type: Number },
  shoulders: { type: Number },
  thighs: { type: Number },
  hips: { type: Number },
  bodyFat: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('MeasurementLog', MeasurementLogSchema);
