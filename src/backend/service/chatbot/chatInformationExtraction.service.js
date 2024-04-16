import TravelReportService from "../travelReport.service.js";

async function extractInformationOutOfChat(travelReport) {
  const { chat } = travelReport;
  let partialTripIterator = 0;
  let transportationIterator = 0;
  let privateCarTransportationIterator = 0;
  let hotelCostIterator = 0;
  let cateringCostIterator = 0;
  let tipCostIterator = 0;
  let otherCostIterator = 0;
  for (const interaction of chat) {
    switch (interaction.question.followingAnswerAttribute) {
      case 'tripStartDateTime':
        travelReport.tripStart = Date.parse(interaction.answer.value);
        break;
      case 'tripEndDateTime':
        travelReport.tripEnd = Date.parse(interaction.answer.value);
        break;
      case 'tripDestinations':
        travelReport.tripDestinations = interaction.answer.value;
        break;
      case 'firstPartialTripDestination':
        travelReport.partialTrips.push({
          destination: interaction.answer.value,
          startDate: travelReport.tripStart
        });
        break;
      case 'partialTripOccasion':
        travelReport.partialTrips[partialTripIterator].occasion = interaction.answer.value;
        break;
      case 'tripOccasion':
        travelReport.partialTrips.push({
          destination: travelReport.tripDestinations[0],
          startDate: travelReport.tripStart,
          endDate: travelReport.tripEnd,
          occasion: interaction.answer.value
        });
        break;
      case 'partialTripEndDate':
        travelReport.partialTrips[partialTripIterator].endDate = interaction.answer.value;
        break;
      case 'nextPartialTripDestination':
        let nextDay = new Date(travelReport.partialTrips[partialTripIterator].endDate);
        nextDay.setDate(nextDay.getDate() +1);
        partialTripIterator++;
        travelReport.partialTrips[partialTripIterator] = {
          destination: interaction.answer.value,
          startDate: nextDay
        };
        break;
      case 'daysWithBreakfast':
        travelReport.daysWithBreakfast = interaction.answer.value;
        break;
      case 'daysWithLunch':
        travelReport.daysWithLunch = interaction.answer.value;
        break;
      case 'daysWithDinner':
        travelReport.daysWithDinner = interaction.answer.value;
        break;
      case 'flightCostDay':
        travelReport.transportationCost.push({
          type: 'flight',
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break; 
      case 'flightCost':
        travelReport.transportationCost[transportationIterator].cost = interaction.answer.value;
        transportationIterator++;
        break;
      case 'busTrainCostDate':
        travelReport.transportationCost.push({
          type: 'busTrain',
          date: interaction.answer.value
        });
        break;
      case 'busTrainCost':
        travelReport.transportationCost[transportationIterator].cost = interaction.answer.value;
        transportationIterator++;
        break;
      case 'cabCostDate':
        travelReport.transportationCost.push({
          type: 'cab',
          date: interaction.answer.value
        });
        break;
      case 'cabCost':
        travelReport.transportationCost[transportationIterator].cost = interaction.answer.value;
        transportationIterator++;
        break;
      case 'privateCarUsedDate':
        travelReport.privateCarTransportation.push({
          date: interaction.answer.value, 
        });
        break;
      case 'privateCarUsedDistance':
        travelReport.privateCarTransportation[privateCarTransportationIterator].mileage = interaction.answer.value;
        break;
      case 'privateCarUsedRouteBrakedown':
        travelReport.privateCarTransportation[privateCarTransportationIterator].routeBreakdown = interaction.answer.value;
        transportationIterator++;
        break;
      case 'privateOvernightStayDates':
        travelReport.daysWithPrivateOvernightStay = interaction.answer.value;
        break;
      case 'hotelCostAccruedDate':
        travelReport.hotelCost.push({
          date: interaction.answer.value
        });
        break;
      case 'hotelCost':
        travelReport.hotelCost[hotelCostIterator].cost = interaction.answer.value;
        hotelCostIterator++;
        break;
      case 'cateringCostAccruedDate':
        travelReport.cateringCost.push({
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break;
      case 'cateringCost':
        travelReport.cateringCost[cateringCostIterator].cost = interaction.answer.value;
        cateringCostIterator++;
        break;
      case 'tipAccruedDate':
        travelReport.tip.push({
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break;
      case 'tipCost':
        travelReport.tip[tipCostIterator].cost = interaction.answer.value;
        tipCostIterator++;
        break;
      case 'otherCostAccruedDate':
        travelReport.other.push({
          date: interaction.answer.value,
          receipt: interaction.answer.receipt
        });
        break;
      case 'otherCost':
        travelReport.other[otherCostIterator].cost = interaction.answer.value;
        break;
      case 'otherCostExplanation':
        travelReport.other[otherCostIterator].explanation = interaction.answer.value;
        tipCostIterator++;
        break;
    }
  }
  return await TravelReportService.replaceOneTravelReport(travelReport._id, travelReport)
}

async function settingGroundInformation(travelReport, question, answer){
  switch (question.followingAnswerAttribute) {
    case 'tripDestinations': 
      await TravelReportService.updateOneTravelReport(travelReport._id, {tripDestinations: answer})
      break;
    case 'tripStartDateTime':
      await TravelReportService.updateOneTravelReport(travelReport._id, {tripStart: answer});
      break;
    case 'tripEndDateTime':
      await TravelReportService.updateOneTravelReport(travelReport._id, {tripEnd: answer});
      break;
  }
}

export default { extractInformationOutOfChat, settingGroundInformation };