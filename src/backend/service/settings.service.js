import Settings from '../models/settings.model.js';

/**
 * @description this function is getting crucial calculation information
 * @returns the settings with the calculation information
 */
async function getSettings() {
  try {
    return await Settings.findOne();
  } catch (error) {
    throw new Error(error)
  }
}

export default { getSettings };
