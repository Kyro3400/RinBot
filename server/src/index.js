require('dotenv').config();
require('./database/connect');
const passport = require('./lib/discord');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  // eslint-disable-next-line no-undef
  secret: process.env.secret_MSG,
  cookie: {
    maxAge: 60 * 1000 * 60 * 24,
  },
  resave: false,
  saveUninitialized: false,
}));

app.use('/api', require('./routers/index.js'));

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`live on: http://localhost:${port}/`));
