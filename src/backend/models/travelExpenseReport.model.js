import mongoose from 'mongoose';

const travelExpenseReportSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  chat:  [{
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      answer: { type: String },
      _id: false
    }],
  trip: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
  status: { type: String, enum:['pending', 'verified', 'accepted', 'declined', 'needsEditing' ], default: 'pending' },
  comment: { type: String }
});

export default mongoose.model('TravelExpenseReport', travelExpenseReportSchema);
