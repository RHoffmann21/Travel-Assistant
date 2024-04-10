import countryLumpRatesModel from '../../models/countryLumpRates.model';
import CountryLumpRateService from '../countryLumpRate.service';

async function convertChatInformationToDates(travelReport){
  let dates = []

  function getDateIndex (searchedDate){
    const index = dates.findIndex(entry => entry.date.getDate() === searchedDate.getDate());
    if (typeof (index) === 'undefined') {
      dates.push({ date: searchedDate });
      return dates.length - 1;
    }
    return index;
  }


    for (const partialTrip of travelReport.partialTrips){
      const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(partialTrip.destination);
      dates[getDateIndex(partialTrip.tripStart)].allowance = countryLumpRate.arrivalDepartureDay;
      dates[getDateIndex(partialTrip.tripEnd)].allowance = countryLumpRate.arrivalDepartureDay;
    }

}

export default { convertChatInformationToDates }
