
import TravelExpenseReportService from '../service/travelExpenseReportService';

export async function getTravelExpenseReports (req, res, next) {
  try {
    const travelExpenseReports = await TravelExpenseReportService.getAllTravelExpenseReports();
    res.send(travelExpenseReports)
  } catch (error) {
    throw Error('Error getting all TravelExpenseReports of a user')
  }
}

async function createOneTravelExpenseReport () {
  
}

async function getOneTravelExpenseReport (travelExpenseReportId) {
  
}

async function updateOneTravelExpenseReport (travelExpenseReportId, changes) {
  
}

async function deleteOneTravelExpenseReport (travelExpenseReportId, changes) {
  
}

// export default {getTravelExpenseReports, createOneTravelExpenseReport, getOneTravelExpenseReport, updateOneTravelExpenseReport, deleteOneTravelExpenseReport}
