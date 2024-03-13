import mongoose from 'mongoose';

const recieptSchema = new mongoose.Schema({
  receipt: { data: Buffer, contentType: String }
});

export default mongoose.model('Receipt', recieptSchema);
