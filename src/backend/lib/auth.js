import logger from 'dts-node-logger';
import passport from 'passport';

import { openidStrategy, ensureLoggedIn, ensureLoggedOut }  from('dts-node-oidc-client');

export default async function (app) {
  // Configure Passport Strategy
  const oidcStrategy = await openidStrategy({
    issuer: process.env.OIDC_ISSUER,
    clientId: process.env.TRAVEL_ASSISTANT_OIDC_CLIENT_ID,
    clientSecret: process.env.TRAVEL_ASSISTANT_OIDC_CLIENT_SECRET,
    redirectUri: process.env.OIDC_REDIRECT_URI,
    scope: 'openid profile email',
    resource: 'no://resource',
    debug: false
  }, (req, tokenSet, userInfo, done) => {
    logger.info('userInfo: %o', userInfo);

    // Place the access token into the current session
    req.session.accessToken = tokenSet.access_token;

    return done(null, userInfo);
  });

  // Passport configuration
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.use('oidc', oidcStrategy);

  app.use(passport.initialize());
  app.use(passport.session());
};

export function authenticate (method, options) {
  return passport.authenticate(method, options);
};

export ensureLoggedIn;

export ensureLoggedOut;