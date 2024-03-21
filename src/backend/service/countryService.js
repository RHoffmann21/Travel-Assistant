import Country from '../models/country.model.js'
import initCountries from '../initData/countries.json'

const CountryService = {};

CountryService.inportInitData = async () => {
  const Country = await Country.find();
  if (typeof (Country) === 'undefined' || Country.length === 0){
    return await new Country(initCountry).save();
  }
}

CountryService.getCountry = async () => {
  const Country = await Country.find()
  if (typeof (Country) === 'undefined' || Country.length === 0) {
    return await CountryService.inportInitData()
  }
  return Country;
}

module.exports = CountryService;