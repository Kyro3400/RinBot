require('dotenv').config();
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONG_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { connection } = mongoose;

connection.on('connected', () => {
  console.log('Database connected');
});

connection.on('disconnected', () => {
  console.log('Database disconnected');
});

connection.on('error', err => {
  console.error(err);
});

module.exports = connection;