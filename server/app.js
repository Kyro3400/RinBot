const express = require('express');
const app = express();

module.exports.load = (client) => {
  app.use('/api', require('./routers/api.js'));

  // eslint-disable-next-line no-undef
  const port = process.env.PORT || 3002;
  app.listen(port, () => client.logger.log(`live on: http://localhost:${port}/`, 'ready'));
};
