import Country from '../models/country.model.js';

async function getCountry(countryId){
  try {
    const country = await Country.findById(countryId);
    return country;
  } catch (error) {
    throw new Error('Error getting one country', error);
  }
}

async function getAllCountries(){
  try {
    return await Country.find();
  } catch (error) {
    throw new Error('Error getting all countries', error);
  }
}

export default { getCountry, getAllCountries }
