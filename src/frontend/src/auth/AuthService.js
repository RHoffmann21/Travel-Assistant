import axios from 'axios';

async function getUser() {
  try {
    const profile = await axios.get('/api/auth/profile');
    return profile.data;
  } catch (error) {
    console.log('error while getting user');
    if(window.location.href.endsWith('/403') || window.location.href.endsWith('/')) return;
    window.location.replace('/403');
  }
}

async function logout() {
  try {
    await axios.get('/api/auth/logout');
  } catch (error) {
    console.log('error while logging out');
  }
}

export default { getUser, logout };