import User from '../models/user.model.js';

async function getOneUserById(userId){
  try {
    return await User.findById(userId);
  } catch (error) {
    
  }
}

async function getOneUserBySubjectId(userSubjectId){
  try {
    return await User.findOne({userSubjectId});
  } catch (error) {
    
  }
}

async function getOneUserByEmail(userEmail){
  try {
    return await User.findOne({userEmail});
  } catch (error) {
    
  }
}

async function createUser(userEmail, userSupervisor){
  try {
    const user = await new User({userEmail, userSupervisor});
    return await User.findById(userId);
  } catch (error) {
    
  }
}

async function upsertUser(data) {
  const user = await User.findOneAndUpdate({
    userSubjectId: data.sub,
  }, {
    $set: {
      userFirstName: data.given_name,
      userName: data.family_name,
      isSupervisor: data.roles.some((role) => role === 'Travel-Assistant Supervisor'),
      isAuditor: data.roles.some((role) => role === 'Travel-Assistant Auditor'),
      userEmail: data.email,
      picture: data.picture,
      userSupervisorSubjectId: data.headof
    },
  }, {
    new: true,
    upsert: true,
  });

  return user._id;
}

export default {
  getOneUserById,
  getOneUserByEmail,
  createUser,
  getOneUserBySubjectId,
  upsertUser
}