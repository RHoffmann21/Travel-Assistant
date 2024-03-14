import mongoose from 'mongoose';

const countryLumpRatesSchema = new mongoose.Schema({
  country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true},
  rates: {
    arrivalDepartureDay: { type: Number, required: true },
    fullDay:  { type: Number, required: true }, 
    privateOvernightStay:  { type: Number, required: true },
  }
});

export default mongoose.model('CountryLumpRates', countryLumpRatesSchema);
