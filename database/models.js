/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

// connect to database
const con = mongoose.connect('mongodb://localhost/products');

const featureSchema = new mongoose.Schema({
  id: String,
  product_id: String,
  feature: String,
  value: String,
});

const photoSchema = new mongoose.Schema({
  id: String,
  thumbnail_url: String,
  url: String,
  styleId: String,
});

const relatedSchema = new mongoose.Schema({
  id: String,
  current_product_id: String,
  related_product_id: String,
});

const skuSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number,
  convertedStyleId: String,
});

const styleSchema = new mongoose.Schema({
  id: String,
  productId: String,
  name: String,
  original_price: String,
  sale_price: { type: String, default: '0' },
  default: Boolean,
  photos: [photoSchema],
  skus: [skuSchema],
});

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  related: [relatedSchema],
  features: [featureSchema],
  styles: [styleSchema],
});

const Product = mongoose.model('Product', productSchema);
const Feature = mongoose.model('Feature', featureSchema);
const Style = mongoose.model('Style', styleSchema);
const Photo = mongoose.model('Photo', photoSchema);
const SKU = mongoose.model('sku', skuSchema);
const Related = mongoose.model('related', relatedSchema);

module.exports = {
  Product,
  Feature,
  Style,
  Photo,
  SKU,
  Related,
  productSchema,
};
