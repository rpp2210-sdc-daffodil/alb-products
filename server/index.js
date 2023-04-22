/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();

app.listen(3000, (() => {
  console.log('The server is listening on port 3000');
}));
