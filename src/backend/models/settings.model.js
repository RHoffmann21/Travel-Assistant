import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  milageAllowance: { type: Number, default: 0.30 },
  breakfastDeductionPercentage: { type: Number, default: 0.2 },
  lunchDeductionPercentage: { type: Number, default: 0.4 },
  dinnerDeductionPercentage: { type: Number, default: 0.4 },
});

export default mongoose.model('Settings', settingsSchema);
