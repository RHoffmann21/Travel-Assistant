import UserService from "../service/user.service.js";
import AuthService from "../service/auth.service.js";

/**
 * @description This function is redirecting the request with needed data trying to get a user of given session information
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns the user if in db. else throw error
 */
async function getUser (req, res, next) {
  const userId  = req.session?.userId;
  if(!userId) return res.status(403).send('no user found');
  const user = await AuthService.getUser(userId)
  if(!user) return res.status(401).send('no user found');
  return res.json(user);
}

/**
 * @description This function checks if user has the given role 
 * @param {String} requiredRole the required role for getting access
 * @returns true or sends 403 error
 */
function getEnsureRoleMiddleware(requiredRole) {
  return function (req, res, next) {

    if (requiredRole ==='isAuditor'){
      if(req.user.isAuditor === true) return next();
    } else if (requiredRole ==='isSupervisor'){
      if(req.user.isSupervisor === true) return next();
    }
    return res.status(403).send('Unauthorized!');
  }
}

const ensureIsAuditor = getEnsureRoleMiddleware('isAuditor');
const ensureIsSupervisor = getEnsureRoleMiddleware('isSupervisor');


/**
 * @description This function is redirecting the request with needed data to resolve the user by given session and passes it into the req
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 */
async function ensureLoggedIn(req, res, next){
  const userId = req.session.userId;
  const user = await UserService.getOneUserById(userId);
  req.user = user;
  !user && res.status(403);
  next()
}

export default { getUser, ensureLoggedIn, ensureIsAuditor, ensureIsSupervisor }
