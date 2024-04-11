import QuestionService from '../service/question.service.js';
import TravelExpenseReportService from '../service/travelExpenseReport.service.js';

async function getTravelExpenseReports (req, res, next) {
  try {
    const travelExpenseReports = await TravelExpenseReportService.getAllTravelExpenseReports();
    return res.json(travelExpenseReports);
  } catch (error) {
    throw Error('Error getting all TravelExpenseReports of a user', error);
  }
}

async function createTravelExpenseReport (req, res, next) {
  const { body } = req;
  try {
    return res.json(await TravelExpenseReportService.createNewTravelExpenseReport(body));
  } catch (error) {
    throw new Error('Error creating new TravelExpenseReport', error)
  }
}

async function getOneTravelExpenseReport (req, res, next) {
  const travelExpenseReportId = req.params.travelExpenseReportId;
  try {
    return res.json(await TravelExpenseReportService.getOneTravelExpenseReport(travelExpenseReportId))
  } catch (error) {
    throw new Error('Error getting one TravelExpenseReport', error)
  }
}

async function updateOneTravelExpenseReport (req, res, next) {
  const { body } = req;
  const travelExpenseReportId = req.params.travelExpenseReportId;
  try {
    return res.json(await TravelExpenseReportService.updateOneTravelExpenseReport(travelExpenseReportId, body))
  } catch (error) {
    
  }
}

async function deleteOneTravelExpenseReport (req, res, next) {
  
}

async function updateTravelExpenseReportChat (req, res, next) {
  const { body } = req;
  const travelExpenseReportId = req.params.travelExpenseReportId;
  try {
    return res.json(await TravelExpenseReportService.updateOneTravelExpenseReport(travelExpenseReportId, body))
  } catch (error) {
    
  }
}

async function getFirstQuestion (req, res, next) {
  try {
    return res.json(await QuestionService.getOneQuestionByQuestionId('ask.tripStart.dateTimeSelect'));
  } catch (error) {
    
  }
}

export default { 
  getTravelExpenseReports,
  createTravelExpenseReport,
  getOneTravelExpenseReport,
  updateOneTravelExpenseReport,
  deleteOneTravelExpenseReport,
  updateTravelExpenseReportChat,
  getFirstQuestion
}
