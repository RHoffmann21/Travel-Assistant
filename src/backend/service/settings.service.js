import Settings from '../models/settings.model.js';

/**
 * @description This function is checking if any settings are saved and if not is inserting init data 
 * @returns The setting object from the database
 */
async function importSettingsData () {
  const settings = await Settings.find();
  if (typeof (settings) === 'undefined' || settings.length === 0){
    return await new Settings({
      milageAllowance: 0.3,
      breakfastDeductionPercentage: 0.2,
      lunchDeductionPercentage: 0.4,
      dinnerDeductionPercentage: 0.4
    }).save();
  }
}

async function getSettings() {
  const settings = await Settings.find()
  if (typeof (settings) === 'undefined' || settings.length === 0) {
    return await importSettingsData();
  }
  return settings;
}

export default { importSettingsData, getSettings };
