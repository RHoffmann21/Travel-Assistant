import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  country: {
    code: { type: String, required: true },
    countryName: { type: String, required: true },
    specialLocation: { type: String }
  }
});

export default mongoose.model('Country', countrySchema);
