/* eslint-disable */
const request = require('supertest');
const jest = require('jest-mock');
const mongoose = require('mongoose');
const makeApp = require('../server/server');
const makeDb = require('../database/controllers');

const getAllProducts = jest.fn()
const getSpecificProduct = jest.fn();
const getStylesForProduct = jest.fn();
const getRelatedProducts = jest.fn();

const appUnit = makeApp({
  getAllProducts,
  getSpecificProduct,
  getStylesForProduct,
  getRelatedProducts,
})

const generateRandomID = () => {
  let randomID = Math.floor(Math.random() * (1000000 - 1) + 1);
  return randomID.toString();
}

describe('products endpoint', () => {
  beforeEach(() => { getAllProducts.mockReset });
  test('should respond with a 200 status code', async () => {
    const response = await request(appUnit).get('/products')
    // console.log(response);
    expect(response.statusCode).toBe(200);
  });

  test('should call getAllProducts', async () => {
    await request(appUnit).get('/products');
    expect(getAllProducts).toHaveBeenCalled();
  });

  // might need revision in calls
  test('should not pass args to getAllProducts', async () => {
    await request(appUnit).get('/products');
    expect(getAllProducts.mock.calls[0].length).toBe(0);
  });
});

describe('specific product endpoint', () => {
  beforeEach(() => {getSpecificProduct.mockReset()});
  // might need to change how it is invoked based on how the requests actually send
  test('should respond with 200 status code when called right', async () => {
    let randomID = generateRandomID();
    const response = await request(appUnit).get(`/products/${randomID}`);
    expect(response.statusCode).toBe(200);
  });

  test('should respond with 404 status code when called wrong', async () => {
    const response = await request(appUnit).get('/products/ABC');
    expect(response.statusCode).toBe(404);
  });

  test('should call getSpecificProduct helper function', async () => {
    let randomID = generateRandomID();
    await request(appUnit).get(`/products/${randomID}`);
    expect(getSpecificProduct).toHaveBeenCalled();
  });

  test('should invoke getSpecificProduct with correct ID', async() => {
    let randomID = generateRandomID();
    await request(appUnit).get(`/products/${randomID}`);
    expect(getSpecificProduct.mock.calls[0][0]).toBe(randomID);
  });

  test('should not call helper function if invalid ID', async () => {
    await request(appUnit).get(`/products/ABC`);
    expect(getSpecificProduct).not.toHaveBeenCalled();
  });
});

xdescribe('product\'s styles endpoint', () => {
  test('should respond with 200 status code when called correctly', async () => {
    let randomID = generateRandomID();
    const response = await request(appUnit).get(`/products/${randomID}/styles`);
    expect(response.statusCode).toBe(200);
  });

  test('should return 404 when not given an acceptable ID', async () => {
    const response = await request(appUnit).get(`/products/ABC/styles`);
    expect(response.statusCode).toBe(404);
  });

  test('should call getStylesForProduct helper function', async () => {
    let randomID = generateRandomID();
    await request(appUnit).get(`'/products/${randomID}/styles`);
    expect(getStylesForProduct.mock.calls.length).toBe(1);
  });

  test('should invoke getStylesForProduct with correct ID', async() => {
    let randomID = generateRandomID();
    await request(appUnit).get(`/products/${randomID}/styles`);
    expect(getSpecificProduct.mock.calls[0][0]).toBe(randomID);
  });

  test('should not call helper function if invalid ID', async () => {
    await request(appUnit).get(`/products/ABC/styles`);
    expect(getStylesForProduct).not.toHaveBeenCalled();
  });
});

describe('related product endpoint', () => {
  test('should respond with 200 status code', async () => {
    let randomID = generateRandomID();
    console.log('randomID: ', randomID);
    const response = await request(appUnit).get(`/products/${randomID}/related`);
    expect(response.statusCode).toBe(200);
  });

  test('should respond with 404 status code when invalid ID', async () => {
    const response = await request(appUnit).get('/products/ABC/related');
    expect(response.statusCode).toBe(404);
  });

  test('should call getRelatedProducts helper function', async () => {
    let randomID = generateRandomID();
    await request(appUnit).get(`/products/${randomID}/related`);
    expect(getRelatedProducts).toHaveBeenCalled();
  });

  test('should invoke getRelatedProducts with correct ID', async() => {
    let randomID = generateRandomID();
    await request(appUnit).get(`/products/${randomID}/related`);
    expect(getSpecificProduct.mock.calls[0][0]).toBe(randomID);
  });

  test('should not call helper function if invalid ID', async () => {
    await request(appUnit).get(`/products/ABC/related`);
    expect(getRelatedProducts).not.toHaveBeenCalled();
  });
});

// database methods
// connect to test database
const con = mongoose.connect('mongodb://localhost/tester');
const { Product } = require('../database/models');
// add controllers to that db
const db = makeDb(Product);

describe('getAllProducts query function', () => {
  test('should return an array', async () => {
    const returnVal = await db.getAllProducts();
    expect(Array.isArray(returnVal)).toBe(true);
  });

  test('should return an array of products', async () => {
    const products = await db.getAllProducts();
    expect(products[0].name).toBeDefined();
    expect(products[3].slogan).toBeDefined();
  });
});

describe('getSpecificProduct query function', () => {
  var randomID = generateRandomID();
  beforeEach(() => {
    randomID = generateRandomID();
  });

  test('should return an object', async () => {
    const product = await db.getSpecificProduct(randomID);
    expect(typeof product).toBe('object');
  });

  test('should return an object with specific properties', async () => {
    const product = await db.getSpecificProduct(randomID);
    expect(product.features).toBeDefined();
  });
});

xdescribe('getStylesForProduct query function', () => {
  var randomID = generateRandomID();
  beforeEach(() => {
    randomID = generateRandomID();
  });

  test('should return an object with results array', async () => {
    let styles = await db.getStylesForProduct(randomID);
    expect(Array.isArray(styles.results)).toBe(true);
  });

  test('should return objects with style properties', async () => {
    let styles = await db.getStylesForProduct(randomID);
    expect(styles.results[0].style_id).toBeDefined();
    expect(styles.results[1].name).toBeDefined();
  });
});

describe('getRelatedProducts', () => {
  var randomID = generateRandomID();
  beforeEach(() => {
    randomID = generateRandomID();
  });

  test('should return array of numbers', async () => {
    let related = await db.getRelatedProducts(randomID);
    expect(Array.isArray(related)).toBe(true);
    expect(typeof related[0]).toBe('number');
  });

  test('should return related products', async () => {
    let related = await db.getRelatedProducts(randomID);
    expect(related[0]).toBeDefined();
  });
});

// integration tests from endpoint to response
const appInt = makeApp(db);
describe('integration tests', () => {
  var randomID = generateRandomID();
  beforeEach(() => {
    randomID = generateRandomID();
  });

  test('/products endpoint works start to finish', async () => {
    const response = await request(appInt).get('/products');
    expect(response._body[0].name).toBeDefined();
  });

  test('/products/:product_id works start to finish', async () => {
    const response = await request(appInt).get(`/products/${randomID}`);
    expect(response._body.name).toBeDefined();
    expect(response._body.slogan).toBeDefined();
  });

  test('/products/:product_id/styles works start to finish', async () => {
    const response = await request(appInt).get(`/products/${randomID}/styles`);
    expect(response.results[0].name).toBeDefined();
  });

  test('/products/:product_id/related works start to finish', async () => {
    const response = await request(appInt).get(`/products/${randomID}/related`);
    expect(response[0]).toBeDefined();
  });
});
