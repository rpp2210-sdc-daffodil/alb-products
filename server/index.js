/* eslint-disable no-console */
const makeApp = require('./server');
const database = require('../database/index');

const app = makeApp(database);

app.listen(3001, () => {
  console.log('listening on port 3001');
});
