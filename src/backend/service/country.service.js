import Country from '../models/country.model.js'
import initCountries from '../initData/countries.json'

async function importInitData() {
  const Country = await Country.find();
  if (typeof (Country) === 'undefined' || Country.length === 0){
    return await new Country(initCountry).save();
  }
}

async function getCountry(){
  const Country = await Country.find()
  if (typeof (Country) === 'undefined' || Country.length === 0) {
    return await inportInitData()
  }
  return Country;
}

export default { importInitData, getCountry }
