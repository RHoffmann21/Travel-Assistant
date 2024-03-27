import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
	questionId: { type: String, required: true },
	content: { type: String, required: true },
  followingAnswerType: { type: String, enum: ['string', 'dateTimeSelect', 'dateSelect', 'multiDateSelect', 'select', 'none'], required: true },
  followingAnswerAttribute: { type: String, required: true },
  condition: { type: String, enum: ['gt0', 'gt1', 'truthy', 'isTripEndDate'] },
  editable: { type: Boolean, required: true},
  nextQuestions: {
    true: { type: String },
    false: { type: String },
    default: { type: String }
  },
});

export default mongoose.model('Question', questionSchema);
f