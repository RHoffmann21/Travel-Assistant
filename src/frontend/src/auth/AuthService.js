import axios from 'axios';
import dtsLogger from 'dts-node-logger';

async function getUser() {
  try {
    const profile = await axios.get('/api/auth/profile');
    return profile.data;
  } catch (error) {
    dtsLogger.error('Error getting profile of user', error)
  }
}

async function logout() {
  try {
    await axios.get('/api/auth/logout');
  } catch (error) {
    dtsLogger.error('Error logging out', error)
  }
}

export default { getUser, logout };