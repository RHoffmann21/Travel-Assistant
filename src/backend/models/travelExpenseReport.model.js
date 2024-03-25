import mongoose from 'mongoose';

const travelExpenseReportSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  chat: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  trip: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
  status: { type: String, enum:['pending', 'verified', 'accepted', 'declined', 'needsEditing' ]},
  comment: { type: String }
});

export default mongoose.model('TravelExpenseReport', travelExpenseReportSchema);
