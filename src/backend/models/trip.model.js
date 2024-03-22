import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  tripStart: { type: Date },
  tripEnd: { type: Date },
  destinations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Country'}],
  partialTrips: [{
      destination: {type: mongoose.Schema.Types.ObjectId, ref: 'Country', enum: this.destinations },
      endDate: { type: Date },
      explenation: { type: String },
  }],
  daysWithBreakfast: [{ type: Date }],
  daysWithLunch: [{ type: Date }],
  daysWithDinner: [{ type: Date }],
  usedTransportation: [{ type: String, enum: [ "plane", "publicTransport", "cab" ] }],
  transportationCost: [{
    vehicle: { type: String, enum: this.usedTransportation },
    dates: [{
      date: { type: Date },
      cost: { type: Number },
      mileage: { type: Number },
      routeBreakdown: { type: String },
      reciept: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
    }]
  }],
  privateCarTransportation: {
    usedPrivateCar: { type: Boolean },
    dates: [{
      date: { type: date },
      mileage: { type: Number },
      routeBreakdown: { type: String },
      numberOfPassangers: { type: Number },
    }]
  },
  privateOvernightStay: { type: Boolean },
  daysWithPrivateOvernightStay: [{ type: Date }],
  hotelStay: { type: Boolean },
  daysWithHotelStay: [{ type: Date }],
  
  other: {
    wasOtherCost: { type: Boolean },
    explenation: { type: String },
    cost: { type: Number },
    reciept: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' }]
  },
});

export default mongoose.model('Trip', tripSchema);
