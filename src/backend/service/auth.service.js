import UserService from './user.service.js';

/**
 * @description this function is trying to get the user with given userId
 * @param {String} userId the given userId 
 * @returns the user from the database
 */
async function getUser(userId) {
  if (!userId) return;
  return await UserService.getOneUserById(userId);
}

export default {
  getUser
}
