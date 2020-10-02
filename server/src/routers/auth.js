const router = require('express').Router();
const passport = require('../lib/discord.js');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.status(200);
});

module.exports = router;
