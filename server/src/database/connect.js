require('dotenv').config();
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
module.exports = mongoose.connect(process.env.MONG_URL, (err) => {
  if (err) throw err;
  else console.log('Connected to DB');
});