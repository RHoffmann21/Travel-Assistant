import axios from 'axios';

async function getUser() {
  try {
    const profile = await axios.get('/api/auth/profile');
    return profile.data;
  } catch (error) {
    throw new Error('Error getting profile of user', error)
  }
}

async function logout() {
  try {
    await axios.get('/api/auth/logout');
  } catch (error) {
    throw new Error('Error logging out', error)
  }
}

export default { getUser, logout };