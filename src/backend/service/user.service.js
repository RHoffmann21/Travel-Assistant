import dtsLogger from 'dts-node-logger';
import User from '../models/user.model.js';

/**
 * @description this function is getting a user by userId
 * @param {String} userId the id of the user
 * @returns the found user
 */
async function getOneUserById(userId){
  try {
    return await User.findById(userId);
  } catch (error) {
    dtsLogger.error('Error getting one user by userId', error);
  }
}

/**
 * @description this function is getting a user by userSubjectId
 * @param {String} userSubjectId the userSubjectId of the user
 * @returns the found user
 */
async function getOneUserBySubjectId(userSubjectId){
  try {
    return await User.findOne({userSubjectId});
  } catch (error) {
    dtsLogger.error('Error getting one user by userSubjectId', error);
  }
}

/**
 * @description this function is upserting a user
 * @param {Object} userData the user information
 * @returns returns the userId of the upserted user
 */
async function upsertUser(userData) {
  try {
    const user = await User.findOneAndUpdate({
      userSubjectId: userData.sub,
    }, {
      $set: {
        userFirstName: userData.given_name,
        userName: userData.family_name,
        isSupervisor: userData.roles.some((role) => role === 'Travel-Assistant Supervisor'),
        isAuditor: userData.roles.some((role) => role === 'Travel-Assistant Auditor'),
        userEmail: userData.email,
        picture: userData.picture,
        userSupervisorSubjectId: userData.headof
      },
    }, {
      new: true,
      upsert: true,
    });
  
    return user._id;
  } catch (error) {
    dtsLogger.error('Error upserting one user', error);
  }

}

export default {
  getOneUserById,
  getOneUserBySubjectId,
  upsertUser
}