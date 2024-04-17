import dtsLogger from 'dts-node-logger';
import CountryLumpRates from '../models/countryLumpRates.model.js';

/**
 * @description this function is getting the country lump rates with given countryId
 * @param {String} countryId the country id
 * @returns the found countryLumpRate
 */
async function getCountryLumpRate(countryId) {
  try {
    return await CountryLumpRates.findOne({country: countryId}).populate('country');
  } catch (error) {
    dtsLogger.error('Error getting one countryLumpRate', error)
  }
}

export default { getCountryLumpRate };