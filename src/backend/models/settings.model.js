import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  milageAllowance: { type: Number },
  breakfastDeductionPercentage: { type: Number },
  lunchDeductionPercentage: { type: Number },
  dinnerDeductionPercentage: { type: Number },
});

export default mongoose.model('Settings', settingsSchema);
