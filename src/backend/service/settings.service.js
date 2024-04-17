import Settings from '../models/settings.model.js';

/**
 * @description this function is getting crucial calculation information
 * @returns the settings with the calculation information
 */
async function getSettings() {
  return await Settings.find()
}

export default { getSettings };
