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
    type: { type: String, enum: ['cab', 'flight', 'busTrain'] },
    dates: [{
      date: { type: Date },
      cost: { type: Number },
      reciept: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
    }]
  }],
  privateCarTransportation: {
    dates: [{
      date: { type: date },
      mileage: { type: Number },
      routeBreakdown: { type: String },
    }]
  },
  daysWithPrivateOvernightStay: [{ type: Date }],
  daysWithHotelStay: [{ type: Date }],
  other: {
    occasion: { type: String },
    cost: { type: Number },
    reciept: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  },
});

export default mongoose.model('Trip', tripSchema);
