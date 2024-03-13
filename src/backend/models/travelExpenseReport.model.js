import mongoose from 'mongoose';

const travelExpenseReportSchema = new mongoose.Schema({
  year: { type: Number },
  month: { type: Number },
  chatBubbles: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  trip: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }]
});

export default mongoose.model('TravelExpenseReport', travelExpenseReportSchema);
