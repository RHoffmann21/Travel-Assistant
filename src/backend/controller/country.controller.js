import CountryService from "../service/country.service";

async function getAllCountries(req, res, next){
  try {
    return res.send(await CountryService.getAllCountries());
  } catch (error) {
    throw new Error('Error getting all counties', error);
  }
}

export default { getAllCountries };
