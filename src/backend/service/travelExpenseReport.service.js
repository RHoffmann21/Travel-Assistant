import TravelExpenseReport from '../models/travelExpenseReport.model.js';
import ChatService from './chat.service.js';
import QuestionService from './question.service.js';

async function getAllTravelExpenseReports () {
  try {
    return await TravelExpenseReport.find();
  } catch (error) {
    throw Error('Error getting all TravelExpenseReports', error);
  }
}

async function getOneTravelExpenseReport (travelExpenseReportId) {
  try {
    return await TravelExpenseReport.findById(travelExpenseReportId).populate({
      path : 'travelReport',
      populate : {
        path : 'chat.question'
      }
    });
  } catch (error) {
    throw Error('Error getting one TravelExpenseReports', error);
  }
}

async function updateOneTravelExpenseReport (travelExpenseReportId, changes) {
  try {
    return await TravelExpenseReport.findOneAndUpdate({_id: travelExpenseReportId}, changes);
  } catch (error) {
    throw Error('Error getting one TravelExpenseReports', error);
  }
}

async function createNewTravelExpenseReport(travelExpenseReport){
  const { year, month } = travelExpenseReport;
  try {
    const newTravelExpenseReport = await new TravelExpenseReport({year, month});
    return await newTravelExpenseReport.save();
  } catch (error) {
    throw new Error('Error creating new travelExpenseReport', error)
  }
}

async function updateTravelExpenseReport(travelExpenseReportId, changes){
  try {
    return await TravelExpenseReport.findOneAndUpdate({_id: travelExpenseReportId}, changes)
  } catch (error) {
    throw new Error('Error creating new travelExpenseReport', error)
  }
}

export default {getAllTravelExpenseReports, getOneTravelExpenseReport, updateOneTravelExpenseReport, createNewTravelExpenseReport, updateTravelExpenseReport};