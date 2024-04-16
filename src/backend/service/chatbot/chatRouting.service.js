import QuestionService from '../question.service.js';
import CountryService from '../country.service.js';

/**
 * @description this function gets the follow-up question 
 * @param {Object} question the origin question object from the frontend
 * @param {Object} answer the user answer to the origin qestion
 * @returns the follow-up question
 */
async function getFollowUpQuestion(question, answer, travelReport){
  console.log('getFollowUpQuestion');
  if (typeof (question.condition) === 'undefined'){
    return await QuestionService.getOneQuestionByQuestionId(question.nextQuestions.default);
  }
  const conditionResult = getResultOfCondition(question.condition, answer, travelReport);
  console.log('conditionResult', conditionResult);
  if(conditionResult){
    return await QuestionService.getOneQuestionByQuestionId(question.nextQuestions.true)
  }
  return await QuestionService.getOneQuestionByQuestionId(question.nextQuestions.false);
}

/**
 * @description this function is getting the result of give condition
 * @param {String} condition the condtionen for the if-statement
 * @param {String} answer the user answer to the origin qestion
 * @param {Object} travelReport the existing travelReport
 * @returns the result of the condition
 */
function getResultOfCondition(condition, answer, travelReport){
  switch (condition) {
    case 'truthy':
      return (answer === true) ? true : false;
    case 'gt1':
      return (answer.length > 1) ? true : false;
    case 'isTripEndDate':
      const answerDate = new Date(answer);
      const tripEndDate = new Date(travelReport.tripEnd);
      return (answerDate.getDate() === tripEndDate.getDate()
      && answerDate.getMonth() === tripEndDate.getMonth()
      && answerDate.getFullYear() === tripEndDate.getFullYear()
      ) ? true : false;
    default:
      throw new Error('no matching condition found')
  }
}

async function getNextAnswerValues(nextQuestion, travelReport){
  switch (nextQuestion.followingAnswerAttribute) {
    case 'tripDestinations':
      return await CountryService.getAllCountries();
    case 'firstPartialTripDestination':
    case 'nextPartialTripDestination':
      let destinations = [];
      for await (const destination of travelReport.tripDestinations){
        destinations.push(await CountryService.getCountry(destination));
      }
      return destinations;
  }
}

export default { getFollowUpQuestion, getNextAnswerValues }
