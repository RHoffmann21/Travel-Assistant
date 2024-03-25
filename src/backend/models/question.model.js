import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  nextAnswerType: { type: String, enum: ['String', 'DateTime', 'Date', 'MultiDateSelect', 'Select', 'MultiSelect'], required: true },
  answerAttribute: { type: String, required: true },
  condition: { type: String, enum: ['gt1', 'truthy'] },
  nextQuestions: {
    true: "blblblblblb",
    false: "blublublu"
  },
});

export default mongoose.model('Question', questionSchema);
f