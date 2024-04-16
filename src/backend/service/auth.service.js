import UserService from './user.service.js';

async function getUser(userId) {
  if (!userId) return;
  return await UserService.getOneUserById(userId);
}

export default {
  getUser
}
