import Settings from '../models/settings.js';
import initSettings from '../initData/settings.json' assert { type: "json" };

/**
 * @description This function is checking if any settings are saved and if not is inserting init data 
 * @returns The setting object from the database
 */
async function importSettingsData () {
  const settings = await Settings.find();
  if (typeof (settings) === 'undefined' || settings.length === 0){
    return await new Settings(initSettings).save();
  }
}

async function getSettings() {
  const settings = await Settings.find()
  if (typeof (settings) === 'undefined' || settings.length === 0) {
    console.log('settings', await importSettingsData());
    return await importSettingsData()
  }
  console.log('settings', settings);
  return settings;
}

export default {importSettingsData, getSettings}
