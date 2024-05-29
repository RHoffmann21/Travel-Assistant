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
  if (typeof (mealAllowance) === 'undefined') throw new TypeError('mealAllowance is undefined');
  let mealDeduction = 0;
  if (!breakfastIncluded && !lunchIncluded && !wasDinnerIncluded) return mealDeduction;
  if (breakfastIncluded && lunchIncluded && wasDinnerIncluded) return mealAllowance;
  breakfastIncluded && (mealDeduction += mealAllowance * (settings.breakfastDeductionPercentage || 0.2));
  lunchIncluded && (mealDeduction += mealAllowance * (settings.lunchDeductionPercentage || 0.4));
  wasDinnerIncluded && (mealDeduction += mealAllowance * (settings.dinnerDeductionPercentage || 0.4));
  return Math.round(mealDeduction * 100) / 100;
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

export default {
  calculateMealDeduction,
  calculateMileageAllowance
}
