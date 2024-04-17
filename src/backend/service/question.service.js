import dtsLogger from 'dts-node-logger';
import Question from '../models/question.model.js';

/**
 * @description this function is getting a question by given questionId 
 * @param {String} questionId the custom questionId of the question
 * @returns the question
 */
async function getOneQuestionByQuestionId(questionId){
  try {
    return await Question.findOne({ questionId });
  } catch (error) {
    dtsLogger.error('Error getting one question', error)
  }
}

export default { getOneQuestionByQuestionId };
