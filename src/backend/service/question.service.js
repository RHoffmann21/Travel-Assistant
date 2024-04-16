import Question from '../models/question.model.js';

async function getOneQuestionByQuestionId(questionId){
  try {
    return await Question.findOne({ questionId });
  } catch (error) {
    throw new Error('Error getting one question', error)
  }
}

async function getOneQuestion(questionId){
  try {
    return await Question.findOneById(questionId);
  } catch (error) {
    throw new Error('Error getting one question', error)
  }
}

export default { getOneQuestionByQuestionId };
