import SettingsService from './settings.service.js';

/**
 * @description 
 * @param {*} conversation 
 * @returns 
 */
function calculateMealAllowance(conversation) {
  let mealAllowance = 0;
  const { arrivalDepartureDay, fullDay, privateOvernightStay} = conversation.countryLumpRates.rates;
  if (conversation.wasArrivalDepartureDay) {
    mealAllowance = arrivalDepartureDay;
  } else if (conversation.wasFullDay) {
    mealAllowance = fullDay
  } else if (conversation.wasPrivateOvernightStay) {
    mealAllowance = privateOvernightStay;
  } else return 0;

  // ggf trennen -> erst lump dann seperat nochmal die kosten raus rechnen 
  if (!conversation.wasBreakfastIncluded && !conversation.wasLunchIncluded && !conversation.wasDinnerIncluded) {
    return parseFloat(mealAllowance);
  } else {
    return parseFloat(mealAllowance - calculateLumpSumMealCut(mealAllowance, conversation.wasBreakfastIncluded, conversation.wasLunchIncluded,conversation.wasDinnerIncluded));
  }
};

/**
 * @description calculates the deduction for included meals
 * @param {Number} mealAllowance the allowance the spesific day
 * @param {Boolean} wasBreakfastIncluded if breackfast was included
 * @param {Boolean} wasLunchIncluded if lunch was included
 * @param {Boolean} wasDinnerIncluded if dinner was included
 * @returns {Number} the cut of the allowance
 */
async function calculateMealDeduction(mealAllowance, wasBreakfastIncluded, wasLunchIncluded, wasDinnerIncluded) {
  const settings = await SettingsService.getSettings();
  if(typeof (mealAllowance) === 'undefined') throw new TypeError('mealAllowance is undefined');
  let mealDeduction = 0;
  if (!wasBreakfastIncluded && !wasLunchIncluded && !wasDinnerIncluded) return mealDeduction;
  if (wasBreakfastIncluded && wasLunchIncluded && wasDinnerIncluded) return parseFloat(mealAllowance) || 0;
  wasBreakfastIncluded && (mealDeduction = parseFloat(mealAllowance * settings.breakfastDeductionPercentage));
  wasLunchIncluded && (mealDeduction += parseFloat(mealAllowance * settings.lunchDeductionPercentage));
  wasDinnerIncluded && (mealDeduction += parseFloat(mealAllowance * settings.dinnerDeductionPercentage));
  return parseFloat(mealDeduction);
}

/**
 * @description calculates the mileage allowance
 * @param {Number} mileage mileage of the spesific date
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
 * @description calculates the total transportation cost of the spesific date
 * @param {Number} flightTicketCost the total cost of flight tickets of the spesific date
 * @param {Number} publicTransportCost the total cost of public transport tickets of the spesific date
 * @param {Number} taxiCost the total cost of taxi of the spesific date
 * @param {Number} mileage mileage of the spesific date
 * @param {Number} additionalPassangerCount number of passanger 
 * @returns {Number} the total sum of transportation cost
 */
async function calculateTransportationCost(flightTicketCost, publicTransportCost, taxiCost, mileage) {
  return parseFloat(flightTicketCost + publicTransportCost + taxiCost + await calculateMileageAllowance(mileage));
}

/**
 * @description 
 * @param {*} hotelCost 
 * @param {*} isPrivateOvernightStay 
 */
function calculateAccommodationCosts(hotelCost, isPrivateOvernightStay) {

}

// export default CalculateReportService;

export default {
  calculateMealAllowance,
  calculateMealDeduction,
  calculateMileageAllowance,
  calculateTransportationCost,
  calculateAccommodationCosts
}
