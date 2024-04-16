import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  receipt: { type: Buffer }
});

export default mongoose.model('Receipt', receiptSchema);
