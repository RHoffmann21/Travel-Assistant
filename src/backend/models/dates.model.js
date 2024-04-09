import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startDateTime: { type: Date, required: true },
  startEndTime: { type: Date, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  allowance: { type: Number },
  occasion: { type: String, required: true  },
  breakfastGiven: { type: Boolean },
  lunchGiven: { type: Boolean },
  dinnerGiven: { type: Boolean },
  mealDeduction: { type: Number },
  transportationCost: [{
    type: { type: String, enum: ['cab', 'flight', 'busTrain'] },
    cost: { type: Number },
    reciepts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
  privateCarTransportation: {
    mileage: { type: Number },
    routeBreakdown: { type: String },
    milageAllowance: { type: Number }
  },
  privateOvernightCost: { type: Number },
  hotelCost: { type: Number },
  other: [{
    occasion: { type: String },
    cost: { type: Number },
    reciepts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
  tip: {
    cost: { type: Number },
    reciepts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  },
  catering: {
    cost: { type: Number },
    reciepts: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  },
  overallCost: { type: Number }
});

export default mongoose.model('Dates', dateSchema);
