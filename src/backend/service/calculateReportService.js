const CalculateReportService = {};

/**
 * @description 
 * @param {*} conversation 
 * @returns 
 */
CalculateReportService.calculateMealAllowance = function (conversation) {
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
CalculateReportService.calculateMealDeduction = function (mealAllowance, wasBreakfastIncluded, wasLunchIncluded, wasDinnerIncluded) {
  if(typeof (mealAllowance) === 'undefined') throw new TypeError('mealAllowance is undefined');
  let mealDeduction = 0;
  if (!wasBreakfastIncluded && !wasLunchIncluded && !wasDinnerIncluded) return mealDeduction;
  if (wasBreakfastIncluded && wasLunchIncluded && wasDinnerIncluded) return parseFloat(mealAllowance) || 0;
  wasBreakfastIncluded && (mealDeduction = parseFloat(mealAllowance * process.env.BREAKFAST_DEDUCTION_PERCENTAGE_CUT));
  wasLunchIncluded && (mealDeduction += parseFloat(mealAllowance * process.env.LUNCH_DINNER_DEDUCTION_PERCENTAGE_CUT));
  wasDinnerIncluded && (mealDeduction += parseFloat(mealAllowance * process.env.LUNCH_DINNER_DEDUCTION_PERCENTAGE_CUT));
  return parseFloat(mealDeduction);
}

/**
 * @description calculates the mileage allowance
 * @param {Number} mileage mileage of the spesific date
 * @returns {Number} the calculated mileage allowance 
 */
CalculateReportService.calculateMileageAllowance = function(mileage) {
  if (typeof (mileage) === 'undefined') throw new TypeError('mileage is undefined');
  if (mileage < 1) return 0; 
  let mileageAllowance = 0;
  mileageAllowance = parseFloat(mileage * process.env.MILEAGE_ALLOWANCE);
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
CalculateReportService.calculateTransportationCost = function(flightTicketCost, publicTransportCost, taxiCost, mileage) {
  return parseFloat(flightTicketCost + publicTransportCost + taxiCost + calculateMileageAllowance(mileage));
}

/**
 * @description 
 * @param {*} hotelCost 
 * @param {*} isPrivateOvernightStay 
 */
CalculateReportService.calculateAccommodationCosts = function(hotelCost, isPrivateOvernightStay) {

}

// export default CalculateReportService;

module.exports = CalculateReportService;
