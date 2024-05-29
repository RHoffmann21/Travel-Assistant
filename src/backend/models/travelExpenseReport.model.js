import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  allowance: { type: Number },
  occasion: { type: String, required: true  },
  breakfastGiven: { type: Boolean },
  lunchGiven: { type: Boolean },
  dinnerGiven: { type: Boolean },
  mealDeduction: { type: Number },
  flight: {
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  },
  busTrain: {
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  },
  cab: {
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  },
  privateCarTransportation: {
    mileage: { type: Number },
    routeBreakdown: { type: String },
    mileageAllowance: { type: Number }
  },
  privateOvernightCost: { type: Number },
  hotelCost: {     
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' } 
  },
  other: {
    explanation: { type: String },
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  },
  tip: {
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  },
  catering: {
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  },
  overallCost: { type: Number }
});

const travelExpenseReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  travelReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelReport' }],
  status: { type: String, enum:['pending', 'verified', 'accepted', 'declined', 'needsEditing'] },
  comment: { type: String },
  dates: [dateSchema]
  });

export default mongoose.model('TravelExpenseReport', travelExpenseReportSchema);
