import Country from '../models/country.model.js'

async function importInitData() {
  const Country = await Country.find();
  if (typeof (Country) === 'undefined' || Country.length === 0){
    return await new Country(initCountry).save();
  }
}

async function getCountry(countryId){
  try {
    return await Country.findOneById(countryId)
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

export default { importInitData, getCountry, getAllCountries }
