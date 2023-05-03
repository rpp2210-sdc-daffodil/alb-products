/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();

app.get('/products', (req, res) => {
  res.send('get request to products');
});

app.get('/products/:product_id', (req, res) => {
  res.send(`get request for ${req.query.product_id}`);
});

app.get('/products/:product_id/styles', (req, res) => {
  res.send(`get request for ${req.query.product_id}'s styles`);
});

app.get('/products/:products_id/related', (req, res) => {
  res.send(`get request for ${req.query.product_id}'s related products`);
});

app.listen(3000, (() => {
  console.log('The server is listening on port 3000');
}));
