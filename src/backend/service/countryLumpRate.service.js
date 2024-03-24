import CountryLumpRates from '../models/countryLumpRates.model.js';

async function getCountryLumpRate(countryId) {
  try {
    return await CountryLumpRates.findOne({countryId});
  } catch (error) {
    throw new Error(error);
  }
}

export default { getCountryLumpRate };