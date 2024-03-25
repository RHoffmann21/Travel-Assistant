import CountryLumpRateService from '../service/countryLumpRate.service.js';

async function getOneCountryLumpRate(req, res, next){
  const countryId = req.params.countryId;
  try {
    return res.send(await CountryLumpRateService.getCountryLumpRate(countryId))
  } catch (error) {
    throw new Error()
  }
}

async function getAllCountries(req, res, next){
  try {
    return res.send(await CountryService.getAllCountries());
  } catch (error) {
    throw new Error('Error getting all counties', error);
  }
}

export default { getAllCountries };
