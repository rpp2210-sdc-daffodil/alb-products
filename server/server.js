/* eslint-disable no-console */
const express = require('express');
// const path = require('path');

const makeApp = (database) => {
  const app = express();

  app.get('/products', async (req, res) => {
    try {
      const allProducts = await database.getAllProducts();
      res.send(allProducts);
    } catch (err) {
      console.log('error getting all products', err);
      res.status(404).send(err);
    }
  });

  app.get('/products/:product_id', async (req, res) => {
    try {
      if (!parseInt(req.params.product_id, 10)) {
        res.status(404).send('invalid product_id');
      } else {
        const product = await database.getSpecificProduct(req.params.product_id);
        res.send(product);
      }
    } catch (err) {
      console.log(`error getting product info for ${req.params.product_id}`);
      res.statusCode(404).send(err);
    }
  });

  app.get('/products/:product_id/styles', async (req, res) => {
    try {
      if (!parseInt(req.params.product_id, 10)) {
        res.status(404).send('invalid product_id');
      } else {
        const styles = await database.getStylesForProduct(req.params.product_id);
        res.send(styles);
      }
    } catch (err) {
      res.statusCode(404).send(`error getting styles information for ${req.query.product_id}`, err);
    }
  });

  app.get('/products/:products_id/related', async (req, res) => {
    try {
      if (!parseInt(req.params.product_id, 10)) {
        res.status(404).send('invalid product_id');
      } else {
        const related = await database.getRelatedProducts(req.params.product_id);
        res.send(related);
      }
    } catch (err) {
      res.status(404).send(`error getting related product information for ${req.params.product_id}`, err);
    }
  });

  return app;
};

module.exports = makeApp;
