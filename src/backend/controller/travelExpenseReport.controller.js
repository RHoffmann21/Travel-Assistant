import ChatInformationExtractionService from '../service/chatbot/chatInformationExtraction.service.js';
import ChatRoutingService from '../service/chatbot/chatRouting.service.js';
import QuestionService from '../service/question.service.js';
import TravelExpenseReportService from '../service/travelExpenseReport.service.js';
import TravelReportService from '../service/travelReport.service.js';
import ReceiptService from '../service/receipt.service.js';
import dtsLogger from 'dts-node-logger';

/**
 * @description This function is redirecting the request with needed data, trying to get all travel expense reports of a given user
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns an all travel expense reports of given user
 */
async function getTravelExpenseReports (req, res, next) {
  try {
    const travelExpenseReports = await TravelExpenseReportService.getAllTravelExpenseReportsOfUser(req.user);
    return res.json(travelExpenseReports);
  } catch (error) {
    dtsLogger.error('Error getting all travel expense reports of a user', error);
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to create travel expense report
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the newly created travel expense report
 */
async function createTravelExpenseReport (req, res, next) {
  const { body } = req;
  try {
    return res.json(await TravelExpenseReportService.createNewTravelExpenseReport(body));
  } catch (error) {
    dtsLogger.error('Error creating new travel expense report', error)
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to get one travel expense report
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the travel expense report
 */
async function getOneTravelExpenseReport (req, res, next) {
  const travelExpenseReportId = req.params.travelExpenseReportId;
  try {
    return res.json(await TravelExpenseReportService.getOneTravelExpenseReport(travelExpenseReportId))
  } catch (error) {
    dtsLogger.error('Error getting one travel expense report', error)
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to update one travel expense report
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the updated travel expense report
 */
async function updateOneTravelExpenseReport (req, res, next) {
  const { body } = req;
  const travelExpenseReportId = req.params.travelExpenseReportId;
  try {
    return res.json(await TravelExpenseReportService.updateOneTravelExpenseReport(travelExpenseReportId, body))
  } catch (error) {
    
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to update one travel expense report chat
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the next question and if given answers values for the next questions
 */
async function updateTravelExpenseReportChat (req, res, next) {
  const { body } = req;
  const travelExpenseReportId = req.params.travelExpenseReportId;
  try {
    const travelExpenseReport = await TravelExpenseReportService.getOneTravelExpenseReport(travelExpenseReportId);
    const index = body.length -1;
    if (body[index].answer.receipt){
      const receipt = await ReceiptService.createNewReceipt(body[index].answer.receipt);
      body[index].answer.receipt = receipt._id;
    }
    const travelReport = await TravelReportService.updateOneTravelReport(travelExpenseReport.travelReports[0]._id, { chat: body });
    const question = await ChatRoutingService.getFollowUpQuestion(body[index].question, body[index].answer.value, travelReport);
    await ChatInformationExtractionService.settingGroundInformation(travelReport, body[index].question, body[index].answer.value)
    const nextAnswerValues = await ChatRoutingService.getNextAnswerValues(question, travelReport, body[index].answer.value);
    return res.json({question, nextAnswerValues});
  } catch (error) {
    
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to get the first question for a travel expense report chat
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the first question
 */
async function getFirstQuestion (req, res, next) {
  try {
    return res.json(await QuestionService.getOneQuestionByQuestionId('ask.tripStart.dateTimeSelect'));
  } catch (error) {
    
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to get the first question for a travel expense report chat
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the first question
 */
async function getTravelExpenseReportsToAudit(req, res, next) {
  try {
    return res.json(await TravelExpenseReportService.getAllTravelExpenseReportsToAudit());
  } catch (error) {
    
  }
}


async function getTravelExpenseReportsToValidate(req, res, next) {
  try {
    return res.json(await TravelExpenseReportService.getAllTravelExpenseReportsToValidate(req.user.userSupervisorSubjectId));
  } catch (error) {
    
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to delete a travel expense report
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the first question
 */
async function deleteTravelExpenseReport(req, res, next) {
  try {
    return res.json(await TravelExpenseReportService.deleteOneTravelExpenseReport(req.params.travelExpenseReportId));
  } catch (error) {
    
  }
}

/**
 * @description This function is redirecting the request with needed data, trying to convert the chat information
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns returns the converted chat information
 */
async function convertTravelExpenseReport(req, res, next) {
  try {
    return res.json(await TravelExpenseReportService.convertTravelExpenseReport(req.params.travelExpenseReportId));
  } catch (error) {
    
  }
}

export default { 
  getTravelExpenseReports,
  createTravelExpenseReport,
  getOneTravelExpenseReport,
  updateOneTravelExpenseReport,
  updateTravelExpenseReportChat,
  getFirstQuestion,
  getTravelExpenseReportsToAudit,
  getTravelExpenseReportsToValidate,
  deleteTravelExpenseReport,
  convertTravelExpenseReport
}
