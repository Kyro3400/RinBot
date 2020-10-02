require('dotenv').config();
const passport = require('passport');
const { Strategy } = require('passport-discord');
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((userId, done) => done(null, userId));

/* eslint-disable no-undef */
passport.use(new Strategy({
  clientID: process.env.client_ID,
  clientSecret: process.env.client_Secret,
  callbackURL: process.env.callback_URL,
  scope: ['identify', 'guilds'],
  /* eslint-enable no-undef */
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
}));

module.exports = passport;