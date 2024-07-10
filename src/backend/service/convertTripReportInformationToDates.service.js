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
    const datesBetween = [];
    for (let i = 1; tripStartDate.getDate() + i < tripEndDate.getDate(); i++) {
      const newDate = new Date(tripStartDate);
      datesBetween.push(new Date(newDate.setDate(newDate.getDate() + i)));
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
  for (let i = 0; i < travelReport.partialTrips.length; i++){
    const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(travelReport.partialTrips[i].destination);
    const tripStartDate = travelReport.partialTrips[i].startDate;
    const tripEndDate = travelReport.partialTrips[i].endDate;
    let index = getDateIndex(tripStartDate);
    dates[index] = {
      ...dates[index],
      allowance: (i === 0) ? countryLumpRate.rates.arrivalDepartureDay : countryLumpRate.rates.fullDay,
      destination: travelReport.partialTrips[i].destination,
      occasion: travelReport.partialTrips[i].occasion,
      overallCost: (i === 0) ? countryLumpRate.rates.arrivalDepartureDay : countryLumpRate.rates.fullDay
    };
    dates[index].overallCost = Math.round(dates[index].overallCost * 100) / 100;
    index = getDateIndex(tripEndDate);
    dates[index] = {
      ...dates[index],
      allowance: (i === travelReport.partialTrips.length -1 || i === 0) ? countryLumpRate.rates.arrivalDepartureDay : countryLumpRate.rates.fullDay,
      destination: travelReport.partialTrips[i].destination,
      occasion: travelReport.partialTrips[i].occasion,
      overallCost: (i === travelReport.partialTrips.length -1 || i === 0) ? countryLumpRate.rates.arrivalDepartureDay : countryLumpRate.rates.fullDay
    };
    dates[index].overallCost = Math.round(dates[index].overallCost * 100) / 100

    const datesBetween = getDatesBetween(tripStartDate, tripEndDate);
    for (let j = 0; j < datesBetween.length; j++){
      index = getDateIndex(datesBetween[j]);
      dates[index] = {
        ...dates[index],
        allowance: countryLumpRate.rates.fullDay,
        destination: travelReport.partialTrips[i].destination,
        occasion: travelReport.partialTrips[i].occasion,
        overallCost: countryLumpRate.rates.fullDay
      };
      dates[index].overallCost = Math.round(dates[index].overallCost * 100) / 100
    }
    
  }
  dates.sort((a, b) => new Date(a.date) - new Date(b.date));

  for(const dayWithBreakfast of travelReport.daysWithBreakfast){
    dates[getDateIndex(dayWithBreakfast)].breakfastGiven = true;
  }
  for(const dayWithLunch of travelReport.daysWithLunch){
    dates[getDateIndex(dayWithLunch)].lunchGiven = true;
  }
  for(const dayWithDinner of travelReport.daysWithDinner){
    dates[getDateIndex(dayWithDinner)].dinnerGiven = true;
  }

  for await (const date of dates){
    if(date.allowance){
      date.mealDeduction = await CalculateReportService.calculateMealDeduction(
        date.allowance,
        date.breakfastGiven,
        date.lunchGiven,
        date.dinnerGiven
      );
      date.overallCost -= date.mealDeduction;
      date.overallCost = Math.round(date.overallCost * 100) / 100
    }
  }


  for(const transportationCost of travelReport.transportationCost){
    const date = dates[getDateIndex(transportationCost.date)];
    if(transportationCost.type==='flight'){
      date.flight = {
        cost: transportationCost.cost,
        receipt: transportationCost.receipt
      }
      date.overallCost += transportationCost.cost;
      date.overallCost = Math.round(date.overallCost * 100) / 100
    }
    else if(transportationCost.type==='busTrain'){
      date.busTrain = {
        cost: transportationCost.cost,
        receipt: transportationCost.receipt
      }
      date.overallCost += transportationCost.cost;
      date.overallCost = Math.round(date.overallCost * 100) / 100
    }
    else if(transportationCost.type==='cab'){
      date.cab = {
        cost: transportationCost.cost,
        receipt: transportationCost.receipt
      }
      date.overallCost += transportationCost.cost;
      date.overallCost = Math.round(date.overallCost * 100) / 100
    }
  }

  for await (const privateCarTransport of travelReport.privateCarTransportation){
    const date = dates[getDateIndex(privateCarTransport.date)]
    date.privateCarTransportation = {
      mileage: privateCarTransport.mileage,
      routeBreakdown: privateCarTransport.routeBreakdown,
      mileageAllowance: await CalculateReportService.calculateMileageAllowance(privateCarTransport.mileage)
    }
    date.overallCost += date.privateCarTransportation.mileageAllowance;
    date.overallCost = Math.round(date.overallCost * 100) / 100
  }

  for(const dayWithPrivateOvernightStay of travelReport.daysWithPrivateOvernightStay){
    const date = dates[getDateIndex(dayWithPrivateOvernightStay)];
    const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(date.destination);
    date.privateOvernightCost = countryLumpRate.rates.privateOvernightStay;
    date.overallCost += countryLumpRate.rates.privateOvernightStay
  }

  for(const hotelCost of travelReport.hotelCost){
    const date = dates[getDateIndex(hotelCost.date)];
    date.hotelCost = {
      cost: hotelCost.cost,
      receipt: hotelCost.receipt
    };
    date.overallCost += hotelCost.cost;
  }

  for(const catering of travelReport.cateringCost){
    const date = dates[getDateIndex(catering.date)];
    date.catering = {
      cost: catering.cost,
      receipt: catering.receipt
    };
    date.overallCost += catering.cost;
  }

  for(const tip of travelReport.tip){
    const date = dates[getDateIndex(tip.date)];
    date.tip = {
      cost: tip.cost,
      receipt: tip.receipt
    };
    date.overallCost += tip.cost
  }

  for(const other of travelReport.other){
    const date = dates[getDateIndex(other.date)];
    date.other = {
      cost: other.cost,
      receipt: other.receipt,
      explanation: other.explanation
    };
    date.overallCost += other.cost; 
  }
  dates.sort((a, b) => new Date(a.date) - new Date(b.date));
  return dates;
}

export default { convertTripReportInformationToDates }
