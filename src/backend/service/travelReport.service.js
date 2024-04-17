import dtsLogger from 'dts-node-logger';
import TravelReport from '../models/travelReport.model.js';

/**
 * @description this function is creating a travelReport
 * @returns the newly created travelReport
 */
async function createTravelReport(){
  try {
    const newTravelReport = await new TravelReport();
    return await newTravelReport.save();
  } catch (error) {
    dtsLogger.error('Error creating new travelReport', error);
  }

}

/**
 * @description this function is getting one travelReport
 * @param {String} travelReportId the id for a travelReport
 * @returns the travelReport
 */
async function getOneTravelReport(travelReportId){
  try {
    return await TravelReport.findById(travelReportId).populate('chat.question');
  } catch (error) {
    dtsLogger.error('Error getting one travelReport', error);
  }
}

/**
 * @description this function is updating one travelReport
 * @param {String} travelReportId the id for a travelReport
 * @param {Object} changes the changes that needs to be set
 * @returns the updated travelReport
 */
async function updateOneTravelReport(travelReportId, changes){
  try {
    return await TravelReport.findOneAndUpdate({_id: travelReportId}, changes);
  } catch (error) {
    dtsLogger.error('Error updating one travelReport', error);
  }
}

/**
 * @description this function is replacing a existing travelReport with a new data
 * @param {String} travelReportId the id for a travelReport
 * @param {Object} newTravelReport the new data for the travelReport
 * @returns the replaced the travelReport
 */
async function replaceOneTravelReport(travelReportId, newTravelReport){
  try {
    return await TravelReport.findOneAndUpdate({_id: travelReportId}, newTravelReport);
  } catch (error) {
    dtsLogger.error('Error replacing one travelReport', error);
  }
}

export default {
  createTravelReport,
  getOneTravelReport,
  updateOneTravelReport,
  replaceOneTravelReport
}