import TravelReport from '../models/travelReport.model.js';

async function createTravelReport(){
  const newTravelReport = await new TravelReport();
  return await newTravelReport.save();
}

async function getOneTravelReport(travelReportId){
  return await TravelReport.findById(travelReportId).populate('chat.question');
}

async function updateOneTravelReport(travelReportId, changes){
  return await TravelReport.findOneAndUpdate({_id: travelReportId}, changes);
}

async function replaceOneTravelReport(travelReportId, newTravelReport){
  return await TravelReport.findOneAndUpdate({_id: travelReportId}, newTravelReport);
}

export default {
  createTravelReport,
  getOneTravelReport,
  updateOneTravelReport,
  replaceOneTravelReport
}