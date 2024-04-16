import Settings from '../models/settings.model.js';

async function getSettings() {
  return await Settings.find()
}

export default { getSettings };
