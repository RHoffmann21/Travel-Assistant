async function extractInformationOutOfChat(travelReport) {
  const { chat } = travelReport;
  let partialTripIterator =
  transportationIterator =
  privateCarTransportationIterator =
  hotelCostIterator =
  cateringCostIterator = 
  tipCostIterator =
  otherCostIterator = 0;
  for (const interaction of chat) {
    switch (interaction.question.followingAnswerAttribute) {
      case 'tripStartDateTime':
        travelReport.tripStart = Date.parse(interaction.answer);
        break;
      case 'tripEndDateTime':
        travelReport.tripEnd = Date.parse(interaction.answer);
        break;
      case 'tripDestinations':
        travelReport.tripDestinations = interaction.answer;
        break;
      case 'firstPartialTripDestination':
        travelReport.partialTrips.push({
          destination: interaction.answer,
          startDate: travelReport.tripStart
        });
        break;
      case 'partialTripOccasion':
        travelReport.partialTrips[partialTripIterator].occasion = interaction.answer;
        break;
      case 'tripOccasion':
        travelReport.partialTrips.push({
          destination: travelReport.tripDestinations[0],
          startDate: travelReport.tripStart,
          endDate: travelReport.tripEnd,
          occasion: interaction.answer
        });
        break;
      case 'partialTripEndDate':
        travelReport.partialTrips[partialTripIterator].endDate = interaction.answer;
        break;
      case 'nextPartialTripDestination':
        let nextDay = new Date(travelReport.partialTrips[partialTripIterator].endDate);
        nextDay.setDate(nextDay.getDate() +1);
        partialTripIterator++;
        travelReport.partialTrips[partialTripIterator] = {
          destination: interaction.answer,
          startDate: nextDay
        };
        break;
      case 'daysWithBreakfast':
        travelReport.daysWithBreakfast = interaction.answer;
        break;
      case 'daysWithLunch':
        travelReport.daysWithLunch = interaction.answer;
        break;
      case 'daysWithDinner':
        travelReport.daysWithDinner = interaction.answer;
        break;
      case 'flightCostDay':
        travelReport.transportationCost.push({
          type: 'flight',
          date: interaction.answer
        });
        break; 
      case 'flightCost':
        travelReport.transportationCost[transportationIterator].cost = interaction.answer;
        transportationIterator++;
        break;
      case 'busTrainCostDate':
        travelReport.transportationCost.push({
          type: 'busTrain',
          date: interaction.answer
        });
        break;
      case 'busTrainCost':
        travelReport.transportationCost[transportationIterator].cost = interaction.answer;
        transportationIterator++;
        break;
      case 'cabCostDate':
        travelReport.transportationCost.push({
          type: 'cab',
          date: interaction.answer
        });
        break;
      case 'cabCost':
        travelReport.transportationCost[transportationIterator].cost = interaction.answer;
        transportationIterator++;
        break;
      case 'privateCarUsedDate':
        travelReport.privateCarTransportation.push({
          date: interaction.answer, 
        });
        break;
      case 'privateCarUsedDistance':
        travelReport.privateCarTransportation[privateCarTransportationIterator].mileage = interaction.answer;
        break;
      case 'privateCarUsedRouteBrakedown':
        travelReport.privateCarTransportation[privateCarTransportationIterator].routeBreakdown = interaction.answer;
        transportationIterator++;
        break;
      case 'privateOvernightStayDates':
        travelReport.daysWithPrivateOvernightStay = interaction.answer;
        break;
      case 'hotelCostAccruedDate':
        travelReport.hotelCost.push({
          date: interaction.answer
        });
        break;
      case 'hotelCost':
        travelReport.hotelCost[hotelCostIterator].cost = interaction.answer;
        hotelCostIterator++;
        break;
      case 'cateringCostAccruedDate':
        travelReport.cateringCost.push({
          date: interaction.answer
        });
        break;
      case 'cateringCost':
        travelReport.cateringCost[cateringCostIterator].cost = interaction.answer;
        cateringCostIterator++;
        break;
      case 'tipAccruedDate':
        travelReport.tip.push({
          date: interaction.answer
        });
        break;
      case 'tipCost':
        travelReport.tip[tipCostIterator].cost = interaction.answer;
        tipCostIterator++;
        break;
      case 'otherCostAccruedDate':
        travelReport.other.push({
          date: interaction.answer
        });
        break;
      case 'otherCost':
        travelReport.other[otherCostIterator].cost = interaction.answer;
        break;
      case 'otherCostExplanation':
        travelReport.other[otherCostIterator].explanation = interaction.answer;
        tipCostIterator++;
        break;
    }
  }
}

export default { extractInformationOutOfChat };