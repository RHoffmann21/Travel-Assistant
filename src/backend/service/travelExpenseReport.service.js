import TravelExpenseReport from '../models/travelExpenseReport.model.js';
import TravelReportService from './travelReport.service.js';
import ChatInformationExtractionService from './chatbot/chatInformationExtraction.service.js';
import ConvertTripReportInformationToDatesService from './convertTripReportInformationToDates.service.js';

async function getAllTravelExpenseReportsOfUser (user) {
  try {
    return await TravelExpenseReport.find({user: user._id});
  } catch (error) {
    throw Error('Error getting all TravelExpenseReports', error);
  }
}

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
    throw Error('Error getting one TravelExpenseReports', error);
  }
}

async function updateOneTravelExpenseReport (travelExpenseReportId, changes) {
  console.log('changes', changes);
  try {
    return await TravelExpenseReport.findOneAndUpdate({_id: travelExpenseReportId}, changes);
  } catch (error) {
    throw Error('Error getting one TravelExpenseReports', error);
  }
}

async function createNewTravelExpenseReport(travelExpenseReport){
  const { year, month, user } = travelExpenseReport;
  try {
    const newTravelReport = await TravelReportService.createTravelReport();
    const newTravelExpenseReport = await new TravelExpenseReport({year, month, travelReports: [newTravelReport._id], user});
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

async function getAllTravelExpenseReportsToAudit(){
  try {
    return await TravelExpenseReport.find({status: 'verified'});
  } catch (error) {
    throw new Error('Error creating new travelExpenseReport', error)
  }
}

async function getAllTravelExpenseReportsToValidate(travelExpenseReportUserSupervisorSubjectId){
  try {
    const TravelExpenseReports = await TravelExpenseReport.find({status: 'pending'}).populate('user');
    return TravelExpenseReports.filter((TravelExpenseReport) => TravelExpenseReport.user.userSupervisorSubjectId === travelExpenseReportUserSupervisorSubjectId);
  } catch (error) {
    throw new Error('Error creating new travelExpenseReport', error)
  }
}

async function deleteOneTravelExpenseReport(travelExpenseReportId){
  try {
    return await TravelExpenseReport.deleteOne({_id: travelExpenseReportId });
  } catch (error) {
    throw new Error('Error creating new travelExpenseReport', error)
  }
}

async function convertTravelExpenseReport(travelExpenseReportId){
  try {
    const travelExpenseReport = await updateOneTravelExpenseReport(travelExpenseReportId, {status: 'pending'});
    const travelReport = await TravelReportService.getOneTravelReport(travelExpenseReport.travelReports[0]);
    const updatedTravelReport = await ChatInformationExtractionService.extractInformationOutOfChat(travelReport);
    await ConvertTripReportInformationToDatesService.convertTripReportInformationToDates(updatedTravelReport);
  } catch (error) {
    throw new Error('Error creating new travelExpenseReport', error)
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