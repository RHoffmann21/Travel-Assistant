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
    partialTrips:[],
    transportationCost: [],
    privateCarTransportation: [],
    hotelCost: [],
    cateringCost: [],
    tip: [],
    other: []
  };
  for await(const interaction of chat) {
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
        });
        break; 
      case 'flightCost':
        newTravelReport.transportationCost[transportationIterator].cost = interaction.answer.value;
        if (interaction.answer.receipt) newTravelReport.transportationCost[transportationIterator].receipt = interaction.answer.receipt;
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
        if (interaction.answer.receipt) newTravelReport.transportationCost[transportationIterator].receipt = interaction.answer.receipt;
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
        if (interaction.answer.receipt) newTravelReport.transportationCost[transportationIterator].receipt = interaction.answer.receipt;
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
      case 'privateCarUsedRouteBreakdown':
        newTravelReport.privateCarTransportation[privateCarTransportationIterator].routeBreakdown = interaction.answer.value;
        privateCarTransportationIterator++;
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
        if (interaction.answer.receipt) newTravelReport.hotelCost[hotelCostIterator].receipt = interaction.answer.receipt;
        hotelCostIterator++;
        break;
      case 'cateringCostAccruedDate':
        newTravelReport.cateringCost.push({
          date: interaction.answer.value
        });
        break;
      case 'cateringCost':
        newTravelReport.cateringCost[cateringCostIterator].cost = interaction.answer.value;
        if (interaction.answer.receipt) newTravelReport.cateringCost[cateringCostIterator].receipt = interaction.answer.receipt;
        cateringCostIterator++;
        break;
      case 'tipAccruedDate':
        newTravelReport.tip.push({
          date: interaction.answer.value
        });
        break;
      case 'tipCost':
        newTravelReport.tip[tipCostIterator].cost = interaction.answer.value;
        if (interaction.answer.receipt) newTravelReport.tip[tipCostIterator].receipt = interaction.answer.receipt;
        tipCostIterator++;
        break;
      case 'otherCostAccruedDate':
        newTravelReport.other.push({
          date: interaction.answer.value
        });
        break;
      case 'otherCost':
        newTravelReport.other[otherCostIterator].cost = interaction.answer.value;
        if (interaction.answer.receipt) newTravelReport.other[otherCostIterator].receipt = interaction.answer.receipt;
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
      await TravelReportService.updateOneTravelReport(travelReport._id, {tripDestinations: answer});
      break;
    case 'tripStartDateTime':
      await TravelReportService.updateOneTravelReport(travelReport._id, {tripStart: answer});
      break;
    case 'tripEndDateTime':
      await TravelReportService.updateOneTravelReport(travelReport._id, {tripEnd: answer});
      break;
  }
}

export default { extractInformationOutOfChat, settingBasicInformation };