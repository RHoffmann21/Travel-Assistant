import TravelExpenseReport from '../models/travelExpenseReport.model.js';
import TravelReportService from './travelReport.service.js';
import ChatInformationExtractionService from './chatbot/chatInformationExtraction.service.js';
import ConvertTripReportInformationToDatesService from './convertTripReportInformationToDates.service.js';
import dtsLogger from 'dts-node-logger';

/**
 * @description this function is getting all travel expense reports of given user
 * @param {Object} user the user object
 * @returns an array of travel expense reports of given user
 */
async function getAllTravelExpenseReportsOfUser (user) {
  try {
    return await TravelExpenseReport.find({user: user._id});
  } catch (error) {
    dtsLogger.error('Error getting all TravelExpenseReports of user', error);
  }
}

/**
 * @description this function is getting one travel expense report with given travelExpenseReportId and populates it
 * @param {String} travelExpenseReportId the id of a travelExpenseReport
 * @returns returns a travelExpenseReport 
 */
async function getOneTravelExpenseReport (travelExpenseReportId) {
  try {
    return await TravelExpenseReport.findById(travelExpenseReportId)
    .populate({
      path : 'travelReports',
      populate : {
        path : 'chat.question'
      },
    })
    .populate({
      path : 'dates',
      populate : {
        path : 'destination'
      },
    })
    .populate({
      path : 'travelReports',
      populate : {
        path : 'chat.answer.receipt'
      },
    });
  } catch (error) {
    dtsLogger.error('Error getting one TravelExpenseReport', error);
  }
}

/**
 * @description this function is updating a travelExpenseReport with given id and the changes
 * @param {String} travelExpenseReportId the id of a travelExpenseReport
 * @param {Abject} changes the changes thats needs to be set
 * @returns the updated travelExpenseReport
 */
async function updateOneTravelExpenseReport (travelExpenseReportId, changes) {
  try {
    return await TravelExpenseReport.findOneAndUpdate({_id: travelExpenseReportId}, changes);
  } catch (error) {
    dtsLogger.error('Error updating one TravelExpenseReport', error);
  }
}

/**
 * @description this function is creating a new travelReport and travelExpenseReport with given information
 * @param {Object} travelExpenseReportInformation basic travelExpenseReport information 
 * @returns the newly created travelExpenseReport
 */
async function createNewTravelExpenseReport(travelExpenseReportInformation){
  const { year, month, user } = travelExpenseReportInformation;
  try {
    const newTravelReport = await TravelReportService.createTravelReport();
    const newTravelExpenseReport = await new TravelExpenseReport({year, month, travelReports: [newTravelReport._id], user});
    return await newTravelExpenseReport.save();
  } catch (error) {
    dtsLogger.error('Error creating new TravelExpenseReport/newTravelReport', error);
  }
}

/**
 * @description this function is updating a travelExpenseReport with given changes
 * @param {String} travelExpenseReportId the id of the travelExpenseReport
 * @param {Object} changes the changes that needs to be set
 * @returns the updated travelExpenseReport
 */
async function updateTravelExpenseReport(travelExpenseReportId, changes){
  try {
    return await TravelExpenseReport.findOneAndUpdate({_id: travelExpenseReportId}, changes)
  } catch (error) {
    dtsLogger.error('Error updating TravelExpenseReport', error);
  }
}

/**
 * @description this function is getting all travel expense reports ready for auditing
 * @returns an array of travel expense reports which are ready for auditing
 */
async function getAllTravelExpenseReportsToAudit(){
  try {
    return await TravelExpenseReport.find({status: 'verified'});
  } catch (error) {
    dtsLogger.error('Error getting all travelExpenseReport for auditing', error);
  }
}

/**
 * @description this function is getting all travel expense reports ready to validate for the given supervisor  
 * @param {String} travelExpenseReportUserSupervisorSubjectId the subjectId of the supervisor
 * @returns an array of travel expense reports ready to validate for the given supervisor 
 */
async function getAllTravelExpenseReportsToValidate(travelExpenseReportUserSupervisorSubjectId){
  try {
    const TravelExpenseReports = await TravelExpenseReport.find({status: 'pending'}).populate('user');
    return TravelExpenseReports.filter((TravelExpenseReport) => TravelExpenseReport.user.userSupervisorSubjectId === travelExpenseReportUserSupervisorSubjectId);
  } catch (error) {
    dtsLogger.error('Error getting all travelExpenseReport for validating', error);
  }
}

/**
 * @description this function is deleting a travelExpenseReport by the id 
 * @param {String} travelExpenseReportId the id of the travelExpenseReport
 * @returns 
 */
async function deleteOneTravelExpenseReport(travelExpenseReportId){
  try {
    return await TravelExpenseReport.deleteOne({_id: travelExpenseReportId });
  } catch (error) {
    dtsLogger.error('Error deleting a travelExpenseReport', error);
  }
}

/**
 * @description this function is converting a travelExpenseReport
 * @param {String} travelExpenseReportId the id of a travelExpenseReport
 */
async function convertTravelExpenseReport(travelExpenseReportId){
  try {
    const travelExpenseReport = await updateOneTravelExpenseReport(travelExpenseReportId, {status: 'pending'});
    const travelReport = await TravelReportService.getOneTravelReport(travelExpenseReport.travelReports[0]);
    const updatedTravelReport = await ChatInformationExtractionService.extractInformationOutOfChat(travelReport);
    await ConvertTripReportInformationToDatesService.convertTripReportInformationToDates(updatedTravelReport);
  } catch (error) {
    dtsLogger.error('Error converting a travelExpenseReport', error);
  }
}


export default {
  getAllTravelExpenseReportsOfUser,
  getOneTravelExpenseReport,
  updateOneTravelExpenseReport,
  createNewTravelExpenseReport,
  updateTravelExpenseReport,
  getAllTravelExpenseReportsToAudit,
  getAllTravelExpenseReportsToValidate,
  deleteOneTravelExpenseReport,
  convertTravelExpenseReport
};