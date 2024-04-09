import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  chat:  [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer: { type: String },
    _id: false
  }],
  tripStart: { type: Date },
  tripEnd: { type: Date },
  tripDestinations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Country'}],
  partialTrips: [{
      destination: {type: mongoose.Schema.Types.ObjectId, ref: 'Country', enum: this.destinations },
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
    reciept: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
  privateCarTransportation: [{
      date: { type: date },
      mileage: { type: Number },
      routeBreakdown: { type: String },
      cost: { type: Number }
  }],
  daysWithPrivateOvernightStay: [{ type: Date }],
  hotelCost: [{ 
    date: { type: Date },
    cost: { type: Number },
    reciept: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
  cateringCost: [{
    date: { type: Date },
    cost: { type: Number }, 
    reciept: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
  tip: [{
    date: { type: Date },
    cost: { type: Number }, 
    reciept: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
  other: [{
    date: { type: Date },
    explanation: { type: String },
    cost: { type: Number },
    reciept: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  }],
});

export default mongoose.model('Trip', tripSchema);
