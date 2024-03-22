import TravelExpenseReportModel from '../models/travelExpenseReport.model';

async function getAllTravelExpenseReports () {
  try {
    return await TravelExpenseReportModel.find();
  } catch (error) {
    throw Error('Error getting all TravelExpenseReports', error);
  }
}

async function getOneTravelExpenseReport (travelExpenseReportId) {
  try {
    return await TravelExpenseReportModel.findById(travelExpenseReportId);
  } catch (error) {
    throw Error('Error getting one TravelExpenseReports', error);
  }
}

async function updateOneTravelExpenseReport (travelExpenseReportId, changes) {
  try {
    return await TravelExpenseReportModel.findOneAndUpdate({_id: travelExpenseReportId}, changes);
  } catch (error) {
    throw Error('Error getting one TravelExpenseReports', error);
  }
}

export default {getAllTravelExpenseReports, getOneTravelExpenseReport, updateOneTravelExpenseReport};