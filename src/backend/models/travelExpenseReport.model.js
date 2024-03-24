import mongoose from 'mongoose';

const travelExpenseReportSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  chatBubbles: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  trip: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }],
  status: { type: String, enum:['pending', 'verified', 'accepted', 'declined', '' ]},
  comment: { type: String }
});

export default mongoose.model('TravelExpenseReport', travelExpenseReportSchema);
