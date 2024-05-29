import TravelReportService from "../travelReport.service.js";

/**
 * @description this function is extracting the information out of the given travelReport chat
 * @param {object} travelReport a travel report
 * @returns the updated travelReport 
 */
async function extractInformationOutOfChat(travelReport) {
  const { chat } = travelReport;
  let partialTripIterator = 0;
  let transportationIterator = 0;
  let privateCarTransportationIterator = 0;
  let hotelCostIterator = 0;
  let cateringCostIterator = 0;
  let tipCostIterator = 0;
  let otherCostIterator = 0;
  const newTravelReport = {
    chat,
    partialTrips:[]
  };
  for (const interaction of chat) {
    switch (interaction.question.followingAnswerAttribute) {
      case 'tripStartDateTime':
        newTravelReport.tripStart = Date.parse(interaction.answer.value);
        break;
      case 'tripEndDateTime':
        newTravelReport.tripEnd = Date.parse(interaction.answer.value);
        break;
      case 'tripDestinations':
        newTravelReport.tripDestinations = interaction.answer.value;
        break;
      case 'firstPartialTripDestination':
        newTravelReport.partialTrips.push({
          destination: interaction.answer.value,
          startDate: newTravelReport.tripStart
        });
        break;
      case 'partialTripOccasion':
        newTravelReport.partialTrips[partialTripIterator].occasion = interaction.answer.value;
        break;
      case 'tripOccasion':
        newTravelReport.partialTrips.push({
          destination: newTravelReport.tripDestinations[0],
          startDate: newTravelReport.tripStart,
          endDate: newTravelReport.tripEnd,
          occasion: interaction.answer.value
        });
        break;
      case 'partialTripEndDate':
        newTravelReport.partialTrips[partialTripIterator].endDate = interaction.answer.value;
        break;
      case 'nextPartialTripDestination':
        let nextDay = new Date(newTravelReport.partialTrips[partialTripIterator].endDate);
        nextDay.setDate(nextDay.getDate() +1);
        partialTripIterator++;
        newTravelReport.partialTrips[partialTripIterator] = {
          destination: interaction.answer.value,
          startDate: nextDay
        };
        break;
      case 'daysWithBreakfast':
        newTravelReport.daysWithBreakfast = interaction.answer.value;
        break;
      case 'daysWithLunch':
        newTravelReport.daysWithLunch = interaction.answer.value;
        break;
      case 'daysWithDinner':
        newTravelReport.daysWithDinner = interaction.answer.value;
        break;
      case 'flightCostDay':
        newTravelReport.transportationCost.push({
          type: 'flight',
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break; 
      case 'flightCost':
        newTravelReport.transportationCost[transportationIterator].cost = interaction.answer.value;
        transportationIterator++;
        break;
      case 'busTrainCostDate':
        newTravelReport.transportationCost.push({
          type: 'busTrain',
          date: interaction.answer.value
        });
        break;
      case 'busTrainCost':
        newTravelReport.transportationCost[transportationIterator].cost = interaction.answer.value;
        transportationIterator++;
        break;
      case 'cabCostDate':
        newTravelReport.transportationCost.push({
          type: 'cab',
          date: interaction.answer.value
        });
        break;
      case 'cabCost':
        newTravelReport.transportationCost[transportationIterator].cost = interaction.answer.value;
        transportationIterator++;
        break;
      case 'privateCarUsedDate':
        newTravelReport.privateCarTransportation.push({
          date: interaction.answer.value, 
        });
        break;
      case 'privateCarUsedDistance':
        newTravelReport.privateCarTransportation[privateCarTransportationIterator].mileage = interaction.answer.value;
        break;
      case 'privateCarUsedRouteBrakedown':
        newTravelReport.privateCarTransportation[privateCarTransportationIterator].routeBreakdown = interaction.answer.value;
        transportationIterator++;
        break;
      case 'privateOvernightStayDates':
        newTravelReport.daysWithPrivateOvernightStay = interaction.answer.value;
        break;
      case 'hotelCostAccruedDate':
        newTravelReport.hotelCost.push({
          date: interaction.answer.value
        });
        break;
      case 'hotelCost':
        newTravelReport.hotelCost[hotelCostIterator].cost = interaction.answer.value;
        hotelCostIterator++;
        break;
      case 'cateringCostAccruedDate':
        newTravelReport.cateringCost.push({
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break;
      case 'cateringCost':
        newTravelReport.cateringCost[cateringCostIterator].cost = interaction.answer.value;
        cateringCostIterator++;
        break;
      case 'tipAccruedDate':
        newTravelReport.tip.push({
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break;
      case 'tipCost':
        newTravelReport.tip[tipCostIterator].cost = interaction.answer.value;
        tipCostIterator++;
        break;
      case 'otherCostAccruedDate':
        newTravelReport.other.push({
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break;
      case 'otherCost':
        newTravelReport.other[otherCostIterator].cost = interaction.answer.value;
        break;
      case 'otherCostExplanation':
        newTravelReport.other[otherCostIterator].explanation = interaction.answer.value;
        tipCostIterator++;
        break;
    }
  }
  return await TravelReportService.replaceOneTravelReport(travelReport._id, newTravelReport)
}

/**
 * @description this function is checking if basic information is provided and saves it for further chat handling 
 * @param {object} travelReport the travel report
 * @param {object} question the origin question
 * @param {String} answer the answer to the origin question
 * @returns the updated travel report 
 */
async function settingBasicInformation(travelReport, question, answer){
  switch (question.followingAnswerAttribute) {
    case 'tripDestinations': 
      return await TravelReportService.updateOneTravelReport(travelReport._id, {tripDestinations: answer});
    case 'tripStartDateTime':
      return await TravelReportService.updateOneTravelReport(travelReport._id, {tripStart: answer});
    case 'tripEndDateTime':
      return await TravelReportService.updateOneTravelReport(travelReport._id, {tripEnd: answer});
  }
}

export default { extractInformationOutOfChat, settingBasicInformation };