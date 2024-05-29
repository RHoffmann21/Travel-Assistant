import passport from 'passport';
import dtsOidc from 'dts-node-oidc-client';
import express from 'express';
import logger from 'dts-node-logger';
import UserService from '../service/user.service.js';

async function initializeService(app) {

  const oidcStrategy = await dtsOidc.openidStrategy({
    issuer: process.env.OIDC_ISSUER,
    clientId: process.env.TRAVEL_ASSISTANT_OIDC_CLIENT_ID,
    clientSecret: process.env.TRAVEL_ASSISTANT_OIDC_CLIENT_SECRET,
    redirectUri: process.env.OIDC_REDIRECT_URI,
    scope: 'openid profile email groups',
    resource: 'no://resource',
    debug: false
  }, async (req, tokenSet, userInfo, done) => {
    logger.info('userInfo: %o', userInfo);
    const userId = await UserService.upsertUser(userInfo);
    req.session.userId = userId;
    return done(null, userInfo);
  });

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.use('oidc', oidcStrategy);

  app.use(passport.initialize());
  app.use(passport.session());
}

export const ensureLoggedIn = dtsOidc.ensureLoggedIn;
export const ensureLoggedOut = dtsOidc.ensureLoggedOut;

export const authRouter = express.Router();

authRouter.get('/login', passport.authenticate('oidc', { response_mode: 'form_post' }));
authRouter.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});
authRouter.post(
  '/callback',
  passport.authenticate('oidc', {
    callback: true,
    successRedirect: '/',
    failureRedirect: '/403',
    keepSessionInfo: true,
  })
);

export default {
  initializeService,
  ensureLoggedIn,
  ensureLoggedOut,
  authRouter
};