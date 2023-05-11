/* eslint-disable no-console */
const makeApp = require('./server');
const database = require('../database/index');

const app = makeApp(database);

app.use('*', (req, res, next) => {
  console.log(`incoming ${req.method} for ${req.url}`);
  next();
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});
