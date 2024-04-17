import QuestionService from '../question.service.js';
import CountryService from '../country.service.js';

/**
 * @description this function gets the follow-up question 
 * @param {Question} question the origin question object from the frontend
 * @param {Object} answer the user answer to the origin question
 * @returns the follow-up question
 */
async function getFollowUpQuestion(question, answer, travelReport){
  if (typeof (question.condition) === 'undefined'){
    return await QuestionService.getOneQuestionByQuestionId(question.nextQuestions.default);
  }
  const conditionResult = getResultOfCondition(question.condition, answer, travelReport);
  if(conditionResult){
    return await QuestionService.getOneQuestionByQuestionId(question.nextQuestions.true);
  }
  return await QuestionService.getOneQuestionByQuestionId(question.nextQuestions.false);
}

/**
 * @description this function is getting the result of given condition
 * @param {String} condition the condition for the if-statement
 * @param {String} answer the user answer to the origin question
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
  }
}

/**
 * @description this function is getting answer values for the next question, based on already saved information
 * @param {Object} nextQuestion the next question
 * @param {Object} travelReport the existing travelReport
 * @returns values for the next question
 */
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
