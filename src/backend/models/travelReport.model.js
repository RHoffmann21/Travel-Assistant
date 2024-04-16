import mongoose from 'mongoose';

const travelReport = new mongoose.Schema({
  chat:  [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer: { 
      value: { type: mongoose.Schema.Types.Mixed },
      content: { type: String },
      receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
    },
    _id: false
  }],
  tripStart: { type: Date },
  tripEnd: { type: Date },
  tripDestinations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Country'}],
  partialTrips: [{
      destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
      startDate: { type: Date },
      endDate: { type: Date },
      occasion: { type: String },
  }],
  daysWithBreakfast: [{ type: Date }],
  daysWithLunch: [{ type: Date }],
  daysWithDinner: [{ type: Date }],
  transportationCost: [{
    type: { type: String, enum: ['cab', 'flight', 'busTrain']},
    date: { type: Date },
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  }],
  privateCarTransportation: [{
      date: { type: Date },
      mileage: { type: Number },
      routeBreakdown: { type: String },
      cost: { type: Number }
  }],
  daysWithPrivateOvernightStay: [{ type: Date }],
  hotelCost: [{ 
    date: { type: Date },
    cost: { type: Number },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  }],
  cateringCost: [{
    date: { type: Date },
    cost: { type: Number }, 
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  }],
  tip: [{
    date: { type: Date },
    cost: { type: Number }, 
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }
  }],
  other: [{
    date: { type: Date },
    explanation: { type: String },
    cost: { type: Number },
    receipt: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
});

export default mongoose.model('TravelReport', travelReport);
