import CountryLumpRateService from './countryLumpRate.service.js';
import CalculateReportService from './calculateReport.service.js';

async function convertTripReportInformationToDates(travelReport){
  let dates = []

  function getDatesBetween(tripStartDate, tripEndDate){
    const datesBetween = []
    while (tripStartDate <= tripEndDate) {
      datesBetween.push(new Date(tripStartDate));
      tripStartDate.setDate(tripStartDate.getDate() + 1);
    }
  }

  function getDateIndex (searchedDate){
    const index = dates.findIndex(entry => entry.date.getDate() === searchedDate.getDate());
    if (typeof (index) === 'undefined') {
      dates.push({ date: searchedDate });
      return dates.length;
    }
    return index;
  }
  for await(const partialTrip of travelReport.partialTrips){
    const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(partialTrip.destination);
    dates[getDateIndex(partialTrip.startDate)] = {
      ...dates[getDateIndex(partialTrip.startDate)],
      allowance: countryLumpRate.arrivalDepartureDay,
      destination: partialTrip.destination,
      occasion: partialTrip.occasion
    };
    dates[getDateIndex(partialTrip.endDate)] = {
      ...dates[getDateIndex(partialTrip.endDate)],
      allowance: countryLumpRate.arrivalDepartureDay,
      destination: partialTrip.destination,
      occasion: partialTrip.occasion
    };
    const datesBetween = getDatesBetween(partialTrip.startDate, partialTrip.endDate);
    for(let i = 1; i<datesBetween.length; i++){fullDay
      dates[getDateIndex(datesBetween[i])] = {
        ...dates[getDateIndex(datesBetween[i])],
        allowance: countryLumpRate.fullDay,
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
      CalculateReportService.calculateMealDeduction(date.allowance,
        dates[getDateIndex(dayWithBreakfast)].breakfastGiven,
        dates[getDateIndex(dayWithLunch)].lunchGiven,
        dates[getDateIndex(dayWithDinner)].dinnerGiven
       )
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
      explenation: other.explanation
    };
  }

  return dates;
}

export default { convertTripReportInformationToDates }
