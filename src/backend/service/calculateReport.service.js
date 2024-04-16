import CountryLumpRateService from './countryLumpRate.service.js';
import SettingsService from './settings.service.js';

/**
 * @description calculates the deduction for included meals
 * @param {Number} mealAllowance the allowance the specific day
 * @param {Boolean} breakfastIncluded if breakfast was included
 * @param {Boolean} lunchIncluded if lunch was included
 * @param {Boolean} dinnerIncluded if dinner was included
 * @returns {Number} the calculated cut of the allowance
 */
async function calculateMealDeduction(mealAllowance, breakfastIncluded, lunchIncluded,
  wasDinnerIncluded) {
  const settings = await SettingsService.getSettings();
  if(typeof (mealAllowance) === 'undefined') throw new TypeError('mealAllowance is undefined');
  let mealDeduction = 0;
  if (!breakfastIncluded && !lunchIncluded && !wasDinnerIncluded) return mealDeduction;
  if (breakfastIncluded && lunchIncluded && wasDinnerIncluded) return mealAllowance;
  breakfastIncluded && (mealDeduction = mealAllowance * settings.breakfastDeductionPercentage);
  lunchIncluded && (mealDeduction += mealAllowance * settings.lunchDeductionPercentage);
  wasDinnerIncluded && (mealDeduction += mealAllowance * settings.dinnerDeductionPercentage);
  return mealDeduction;
}

/**
 * @description calculates the mileage allowance
 * @param {Number} mileage mileage of the specific date
 * @returns {Number} the calculated mileage allowance 
 */
async function calculateMileageAllowance(mileage) {
  const settings = await SettingsService.getSettings();
  if (typeof (mileage) === 'undefined') throw new TypeError('mileage is undefined');
  if (mileage < 1) return 0; 
  let mileageAllowance = 0;
  mileageAllowance = parseFloat(mileage * settings.mileageAllowance);
  return mileageAllowance;
}

/**
 * @description calculates the total transportation cost of the specific date
 * @param {Number} flightTicketCost the total cost of flight tickets of the specific date
 * @param {Number} publicTransportCost the total cost of public transport tickets of the specific date
 * @param {Number} taxiCost the total cost of taxi of the specific date
 * @returns {Number} the total sum of transportation cost
 */
function calculateTransportationCost(flightTicketCost, publicTransportCost, taxiCost) {
  return parseFloat(flightTicketCost + publicTransportCost + taxiCost );
}

/**
 * @description
 * @param {Number} mileage mileage of the specific date
 * @returns 
 */
async function calculatePrivateCarCost(mileage) {
  return calculateMileageAllowance(mileage);
}

async function calculateItemizationCost(hotelCost, cateringCost, tips, otherCosts, isPrivateOverstay, countryId) {
  let itemizationCost = 0;
  if (isPrivateOverstay){
    const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(countryId)
    itemizationCost += countryLumpRate.privateOvernightStay;
  }
  return parseFloat(itemizationCost + hotelCost + cateringCost + tips, otherCosts)
}

async function calculateCateringCost(wasBreakfastIncluded, wasLunchIncluded, wasDinnerIncluded) {
  let cateringCost = 0;
  const mealAllowance = await calculateMealAllowance(countryId)
  const mealDeduction = await calculateMealDeduction(cateringCost, )
  if (isPrivateOverstay){
    const countryLumpRate = await CountryLumpRateService.getCountryLumpRate(countryId)
    itemizationCost += countryLumpRate.privateOvernightStay;
  }
  return parseFloat(itemizationCost + hotelCost + cateringCost + tips, otherCosts)
}

export default {
  calculateMealDeduction,
  calculatePrivateCarCost,
  calculateTransportationCost
}
