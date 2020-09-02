const express = require('express');
const app = express();

app.use('/api', require('./routers/api.js'));

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`live on: http://localhost:${port}/`));
