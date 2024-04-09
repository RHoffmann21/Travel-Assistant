async function extractInformationOutOfChat(trip) {
  const { chat } = trip;
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
        trip.tripStart = Date.parse(interaction.answer);
        break;
      case 'tripEndDateTime':
        trip.tripEnd = Date.parse(interaction.answer);
        break;
      case 'tripDestinations':
        trip.tripDestinations = interaction.answer;
        break;
      case 'firstPartialTripDestination':
        trip.partialTrips.push({
          destination: interaction.answer,
          startDate: trip.tripStart
        });
        break;
      case 'partialTripOccasion':
        trip.partialTrips[partialTripIterator].occasion = interaction.answer;
        break;
      case 'tripOccasion':
        trip.partialTrips.push({
          destination: trip.tripDestinations[0],
          startDate: trip.tripStart,
          endDate: trip.tripEnd,
          occasion: interaction.answer
        });
        break;
      case 'partialTripEndDate':
        trip.partialTrips[partialTripIterator].endDate = interaction.answer;
        break;
      case 'nextPartialTripDestination':
        let nextDay = new Date(trip.partialTrips[partialTripIterator].endDate);
        nextDay.setDate(nextDay.getDate() +1);
        partialTripIterator++;
        trip.partialTrips[partialTripIterator] = {
          destination: interaction.answer,
          startDate: nextDay
        };
        break;
      case 'daysWithBreakfast':
        trip.daysWithBreakfast = interaction.answer;
        break;
      case 'daysWithLunch':
        trip.daysWithLunch = interaction.answer;
        break;
      case 'daysWithDinner':
        trip.daysWithDinner = interaction.answer;
        break;
      case 'flightCostDay':
        trip.transportationCost.push({
          type: 'flight',
          date: interaction.answer
        });
        break; 
      case 'flightCost':
        trip.transportationCost[transportationIterator].cost = interaction.answer;
        transportationIterator++;
        break;
      case 'busTrainCostDate':
        trip.transportationCost.push({
          type: 'busTrain',
          date: interaction.answer
        });
        break;
      case 'busTrainCost':
        trip.transportationCost[transportationIterator].cost = interaction.answer;
        transportationIterator++;
        break;
      case 'cabCostDate':
        trip.transportationCost.push({
          type: 'cab',
          date: interaction.answer
        });
        break;
      case 'cabCost':
        trip.transportationCost[transportationIterator].cost = interaction.answer;
        transportationIterator++;
        break;
      case 'privateCarUsedDate':
        trip.privateCarTransportation.push({
          date: interaction.answer, 
        });
        break;
      case 'privateCarUsedDistance':
        trip.privateCarTransportation[privateCarTransportationIterator].mileage = interaction.answer;
        break;
      case 'privateCarUsedRouteBrakedown':
        trip.privateCarTransportation[privateCarTransportationIterator].routeBreakdown = interaction.answer;
        transportationIterator++;
        break;
      case 'privateOvernightStayDates':
        trip.daysWithPrivateOvernightStay = interaction.answer;
        break;
      case 'hotelCostAccruedDate':
        trip.hotelCost.push({
          date: interaction.answer
        });
        break;
      case 'hotelCost':
        trip.hotelCost[hotelCostIterator].cost = interaction.answer;
        hotelCostIterator++;
        break;
      case 'cateringCostAccruedDate':
        trip.cateringCost.push({
          date: interaction.answer
        });
        break;
      case 'cateringCost':
        trip.cateringCost[cateringCostIterator].cost = interaction.answer;
        cateringCostIterator++;
        break;
      case 'tipAccruedDate':
        trip.tip.push({
          date: interaction.answer
        });
        break;
      case 'tipCost':
        trip.tip[tipCostIterator].cost = interaction.answer;
        tipCostIterator++;
        break;
      case 'otherCostAccruedDate':
        trip.other.push({
          date: interaction.answer
        });
        break;
      case 'otherCost':
        trip.other[otherCostIterator].cost = interaction.answer;
        break;
      case 'otherCostExplanation':
        trip.other[otherCostIterator].explanation = interaction.answer;
        tipCostIterator++;
        break;
    }
  }
}

export default { extractInformationOutOfChat };