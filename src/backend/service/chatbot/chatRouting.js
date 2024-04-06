import QuestionService from '../question.service';

/**
 * @description this function gets gets the follow-up question 
 * @param {Object} question the origin question object from the frontend
 * @param {String} answer the user answer to the origin qestion
 * @returns the follow-up question
 */
async function getFollowUpQuestion(question, answer, travelExpenseReport){
  if (typeof (question.condition) === 'undefined'){
    return await QuestionService.getOneQuestionByQuestionId(question.nextQuestion.default);
  }
  const conditionResult = getResultOfCondition(question.condition, answer, travelExpenseReport);
  if(conditionResult){
    return await QuestionService.getOneQuestionByQuestionId(question.nextQuestion.true)
  }
  return await QuestionService.getOneQuestionByQuestionId(question.nextQuestion.flase);
}

/**
 * @description this function is getting
 * @param {String} condition the condtionen for the if-statement
 * @param {String} answer the user answer to the origin qestion
 * @param {Object} travelExpenseReport the existing travelexpense report
 * @returns the result of the condition
 */
async function getResultOfCondition(condition, answer, travelExpenseReport){
  switch (condition) {
    case 'truthy':
      return (answer === true) ? true : false;
    case 'gt1':
      return (answer.length > 1) ? true : false;
    case 'isTripEndDate':
      return (Date.parse(answer) === travelExpenseReport.tripEndDate) ? true : false;
    default:
      throw new Error('no matching condition found')
  }
}

export default {getFollowUpQuestion}
