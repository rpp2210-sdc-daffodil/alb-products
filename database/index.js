const mongoose = require('mongoose');

const con = mongoose.connect('mongodb://localhost/products');

module.exports = con;
