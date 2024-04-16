import dtsLogger from "dts-node-logger";
import CountryService from "../service/country.service.js";

/**
 * @description This function is trying to get all countries
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns all countries
 */
async function getAllCountries(req, res, next){
  try {
    return res.json(await CountryService.getAllCountries());
  } catch (error) {
    dtsLogger.error('Error getting all counties from db', error);
  }
}

export default { getAllCountries };
