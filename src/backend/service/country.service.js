import dtsLogger from 'dts-node-logger';
import Country from '../models/country.model.js';

/**
 * @description this function is getting a country by its countryId
 * @param {String} countryId the id of a country
 * @returns a country
 */
async function getCountry(countryId){
  try {
    const country = await Country.findById(countryId);
    return country;
  } catch (error) {
    dtsLogger.error('Error getting one country', error)
  }
}

/**
 * @description this function is getting all countries
 * @returns all countries
 */
async function getAllCountries(){
  try {
    return await Country.find();
  } catch (error) {
    dtsLogger.error('Error getting all countries', error)
  }
}

export default { getCountry, getAllCountries }
