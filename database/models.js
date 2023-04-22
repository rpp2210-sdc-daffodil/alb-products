/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products');

const featureSchema = new mongoose.Schema({
  product_id: Number,
  feature: String,
  value: String,
});

const photoSchema = new mongoose.Schema({
  thumbnail_url: String,
  url: String,
  product_id: Number,
  style_id: Number,
});

const skuSchema = new mongoose.Schema({
  product_id: Number,
  size: String,
  stock: Number,
  style_id: Number,
});

const styleSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  original_price: Number,
  sale_price: { type: Number, default: 0 },
  default: Boolean,
  photos: [photoSchema],
  skus: [skuSchema],
});

const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  related: [Number],
  features: [featureSchema],
  styles: [styleSchema],
});

const Product = mongoose.model('Product', productSchema);
const Feature = mongoose.model('Feature', featureSchema);
const Style = mongoose.model('Style', styleSchema);
const Photo = mongoose.model('Photo', photoSchema);
const SKU = mongoose.model('sku', skuSchema);

module.exports.Product = Product;
