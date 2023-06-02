/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const redis = require('redis');

const makeApp = (database) => {
  const app = express();
  let redisClient;
  (async () => {
    redisClient = redis.createClient();
    redisClient.on('error', (err) => console.error(`Redis Error: ${err}`));
    await redisClient.connect();
  })();

  app.get('/loaderio-*', (req, res) => {
    const options = {
      root: path.join(__dirname, '../public'),
    };
    res.sendFile('loaderio-verification.txt', options);
  });

  app.get('/products', async (req, res) => {
    let allProducts;
    try {
      const cacheProducts = await redisClient.get('allProducts');
      if (cacheProducts === null || cacheProducts.length === 0) {
        allProducts = await database.getAllProducts();
        await redisClient.set('allProducts', JSON.stringify(allProducts));
      } else {
        allProducts = JSON.parse(cacheProducts);
      }
      res.send(allProducts);
    } catch (err) {
      console.log('error getting all products', err);
      res.status(404).send(err);
    }
  });

  app.get('/products/:product_id', async (req, res) => {
    let product;
    try {
      if (!parseInt(req.params.product_id, 10)) {
        res.status(404).send('invalid product_id');
      } else {
        const cacheProduct = await redisClient.get(`sp_${req.params.product_id}`);
        if (cacheProduct === null || Object.keys(JSON.parse(cacheProduct)).length === 0) {
          product = await database.getSpecificProduct(req.params.product_id);
          await redisClient.set(`sp_${req.params.product_id}`, JSON.stringify(product));
        } else {
          product = JSON.parse(cacheProduct);
        }
        res.send(product);
      }
    } catch (err) {
      console.log(`error getting product info for ${req.params.product_id}`);
      res.statusCode(404).send(err);
    }
  });

  app.get('/products/:product_id/styles', async (req, res) => {
    let styles;
    try {
      if (!parseInt(req.params.product_id, 10)) {
        res.status(404).send('invalid product_id');
      } else {
        const cacheStyles = await redisClient.get(`styles_${req.params.product_id}`);
        if (cacheStyles === null || Object.keys(JSON.parse(cacheStyles)).length === 0) {
          styles = await database.getStylesForProduct(req.params.product_id);
          await redisClient.set(`styles_${req.params.product_id}`, JSON.stringify(styles));
        } else {
          styles = JSON.parse(cacheStyles);
        }
        res.send(styles);
      }
    } catch (err) {
      res.statusCode(404).send(err);
    }
  });

  app.get('/products/:product_id/related', async (req, res) => {
    let related;
    try {
      if (!parseInt(req.params.product_id, 10)) {
        res.status(404).send('invalid product_id');
      } else {
        const cacheRelated = await redisClient.get(`related_${req.params.product_id}`);
        if (cacheRelated === null || JSON.parse(cacheRelated).length === 0) {
          related = await database.getRelatedProducts(req.params.product_id);
          await redisClient.set(`related_${req.params.product_id}`, related);
        } else {
          related = JSON.parse(cacheRelated);
        }
        res.send(related);
      }
    } catch (err) {
      res.status(404).send(err);
    }
  });

  return app;
};

module.exports = makeApp;
