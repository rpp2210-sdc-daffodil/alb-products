const mongoose = require('mongoose');
const makeDb = require('./controllers');
const models = require('./models');

// add controllers to model
const controllers = makeDb(models.Product);

module.exports = controllers;
