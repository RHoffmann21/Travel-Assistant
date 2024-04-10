import mongoose from 'mongoose';

const travelExpenseReportSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  travelReport: {type: mongoose.Schema.Types.ObjectId, ref: 'TravelReport' },
  status: { type: String, enum:['pending', 'verified', 'accepted', 'declined', 'needsEditing'], default: 'pending' },
  comment: { type: String }
});

export default mongoose.model('TravelExpenseReport', travelExpenseReportSchema);
