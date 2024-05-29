import CountryLumpRateService from './countryLumpRate.service.js';
import CalculateReportService from './calculateReport.service.js';

/**
 * @description this function is converting the previously extracted chat information into single dates so they can easily be displayed on date bases
 * @param {Object} travelReport the travelReport 
 * @returns {Array} dates array with every cost splitted on the given date
 */
async function convertTripReportInformationToDates(travelReport){
  let dates = []

  function getDatesBetween(tripStartDate, tripEndDate){
    const datesBetween = []
    while (tripStartDate <= tripEndDate) {
      datesBetween.push(new Date(tripStartDate));
      tripStartDate.setDate(tripStartDate.getDate() + 1);
    }
    return datesBetween;
  }

  function getDateIndex (searchedDate){
    const index = dates.findIndex(entry => entry.date.getDate() === searchedDate.getDate());
    if (index === -1) {
      dates.push({ date: searchedDate });
      return dates.length-1;
    }
    return index;
  }
  for await(const partialTrip of travelReport.partialTrips){
    const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(partialTrip.destination);
    let index = getDateIndex(partialTrip.startDate);
    dates[index] = {
      ...dates[index],
      allowance: countryLumpRate.rates.arrivalDepartureDay,
      destination: partialTrip.destination,
      occasion: partialTrip.occasion
    };
    index = getDateIndex(partialTrip.endDate)
    dates[index] = {
      ...dates[index],
      allowance: countryLumpRate.rates.arrivalDepartureDay,
      destination: partialTrip.destination,
      occasion: partialTrip.occasion
    };
    const datesBetween = getDatesBetween(partialTrip.startDate, partialTrip.endDate);
    for(let i = 1; i<datesBetween.length -1; i++){
      index = getDateIndex(datesBetween[i])
      dates[index] = {
        ...dates[index],
        allowance: countryLumpRate.rates.fullDay,
        destination: partialTrip.destination,
        occasion: partialTrip.occasion
      };
    }
  }

  for(const dayWithBreakfast of travelReport.daysWithBreakfast){
    dates[getDateIndex(dayWithBreakfast)].breakfastGiven = true;
  }
  for(const dayWithLunch of travelReport.daysWithLunch){
    dates[getDateIndex(dayWithLunch)].lunchGiven = true;
  }
  for(const dayWithDinner of travelReport.daysWithDinner){
    dates[getDateIndex(dayWithDinner)].dinnerGiven = true;
  }

  for(const date of dates){
    if(date.allowance){
      date.mealDeduction = await CalculateReportService.calculateMealDeduction(
        date.allowance,
        date.breakfastGiven,
        date.lunchGiven,
        date.dinnerGiven
      );
    }
  }

  for(const transportationCost of travelReport.transportationCost){
    if(type==='flight'){
      dates[getDateIndex(transportationCost.date)].flight = {
        cost: transportationCost.cost,
        receipt: transportationCost.receipt
      }
    }
    else if(type==='busTrain'){
      dates[getDateIndex(transportationCost.date)].flight = {
        cost: transportationCost.cost,
        receipt: transportationCost.receipt
      }
    }
    else if(type==='cab'){
      dates[getDateIndex(transportationCost.date)].flight = {
        cost: transportationCost.cost,
        receipt: transportationCost.receipt
      }
    }
  }

  for(const privateCarTransport of travelReport.privateCarTransportation){
    dates[getDateIndex(privateCarTransport.date)].privateCarTransportation = {
      mileage: privateCarTransport.mileage,
      routeBreakdown: privateCarTransport.routeBreakdown,
      mileageAllowance: CalculateReportService.calculateMileageAllowance(privateCarTransport.mileage)
    }
  }

  for(const dayWithPrivateOvernightStay of travelReport.daysWithPrivateOvernightStay){
    const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(dates[getDateIndex(dayWithPrivateOvernightStay)].destination);
    dates[getDateIndex(dayWithPrivateOvernightStay)].privateOvernightCost = countryLumpRate.privateOvernightStay ;
  }

  for(const hotelCost of travelReport.hotelCost){
    dates[getDateIndex(hotelCost.date)].hotelCost = {
      cost: hotelCost.cost,
      receipt: hotelCost.receipt
    };
  }

  for(const catering of travelReport.cateringCost){
    dates[getDateIndex(catering.date)].catering = {
      cost: catering.cost,
      receipt: catering.receipt
    };
  }

  for(const tip of travelReport.tip){
    dates[getDateIndex(tip.date)].tip = {
      cost: tip.cost,
      receipt: tip.receipt
    };
  }

  for(const other of travelReport.other){
    dates[getDateIndex(other.date)].other = {
      cost: other.cost,
      receipt: other.receipt,
      explanation: other.explanation
    };
  }
  return dates;
}

export default { convertTripReportInformationToDates }
