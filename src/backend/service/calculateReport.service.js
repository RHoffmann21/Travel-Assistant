import SettingsService from './settings.service.js';

/**
 * @description calculates the deduction for included meals
 * @param {Number} mealAllowance the allowance the specific day
 * @param {boolean} breakfastIncluded if breakfast was included
 * @param {boolean} lunchIncluded if lunch was included
 * @param {boolean} dinnerIncluded if dinner was included
 * @returns {Number} the calculated cut of the allowance
 */
async function calculateMealDeduction(mealAllowance, breakfastIncluded, lunchIncluded, dinnerIncluded) {
  if (typeof (mealAllowance) === 'undefined') throw new TypeError('mealAllowance is undefined');
  let mealDeduction = 0;
  if (!breakfastIncluded && !lunchIncluded && !dinnerIncluded) return mealDeduction;
  if (breakfastIncluded && lunchIncluded && dinnerIncluded) return mealAllowance;
  const settings = await SettingsService.getSettings();
  breakfastIncluded && (mealDeduction += mealAllowance * (settings.breakfastDeductionPercentage || 0.2));
  lunchIncluded && (mealDeduction += mealAllowance * (settings.lunchDeductionPercentage || 0.4));
  dinnerIncluded && (mealDeduction += mealAllowance * (settings.dinnerDeductionPercentage || 0.4));
  return Math.round(mealDeduction * 100) / 100;
}

/**
 * @description calculates the mileage allowance
 * @param {Number} mileage mileage of the specific date
 * @returns {Number} the calculated mileage allowance 
 */
async function calculateMileageAllowance(mileage) {
  if (typeof (mileage) === 'undefined') throw new TypeError('mileage is undefined');
  if (mileage < 1) return 0;
  let mileageAllowance = 0;
  const settings = await SettingsService.getSettings();
  mileageAllowance = mileage * settings.milageAllowance;
  return mileageAllowance;
}

export default {
  calculateMealDeduction,
  calculateMileageAllowance
}
