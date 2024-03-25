import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatBubbles: [{
    side: { type: String, enum: ['question', 'answer'], required: true },
    type: { type: String, enum: ['String', 'Date',], required: true },
    content: { type: String },
    nextAnswerType: { type: String, enum: ['String', 'Date', 'multiDateSelect', 'select'] },
    answerAttribute: { type: String },
    considered: { type: Boolean, default: true }
  }],
});

export default mongoose.model('Chat', chatSchema);
