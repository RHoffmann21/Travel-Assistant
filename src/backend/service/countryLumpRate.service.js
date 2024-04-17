import CountryLumpRates from '../models/countryLumpRates.model.js';

/**
 * @description this function is getting the country lump rates with given countryId
 * @param {String} countryId the country id
 * @returns 
 */
async function getCountryLumpRate(countryId) {
  try {
    return await CountryLumpRates.findOne({country: countryId}).populate('country');
  } catch (error) {
    throw new Error(error);
  }
}

export default { getCountryLumpRate };