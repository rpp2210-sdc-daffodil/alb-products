/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
const mongoose = require('mongoose');

const makeDb = (model) => {
  const getAllProducts = async () => {
    try {
      return await model.find({ id: { $lte: 1000 } }).select('id name slogan description category default_price').lean();
    } catch (err) {
      console.log('err getting all products', err);
      return err;
    }
  };

  const getSpecificProduct = async (product_id) => {
    if (typeof product_id === 'number') {
      product_id = product_id.toString();
    }
    // use given product_id to query database
    try {
      // shape data into desired format
      const productInfo = await model.findOne({ id: product_id }).select('id name slogan description category default_price features').lean();
      console.log(productInfo);
      const features = productInfo.features.map((featureObj) => {
        return {
          feature: featureObj.feature,
          value: featureObj.value,
        };
      });
      const format = {
        id: parseInt(productInfo.id, 10),
        name: productInfo.name,
        slogan: productInfo.slogan,
        description: productInfo.description,
        category: productInfo.category,
        default_price: productInfo.default_price,
        features,
      };
      return format;
    } catch (err) {
      console.log(`error getting info for ${product_id}`, err);
      return err;
    }
  };

  const getStylesForProduct = async (product_id) => {
    if (typeof product_id === 'number') {
      product_id = product_id.toString();
    }
    try {
      const styles = await model.findOne({ id: product_id }).select('styles');
      console.log('styles', styles);
      const results = styles.styles.map((styleObj) => {
        const photos = styleObj.photos.map((photo) => {
          return {
            thumbnail_url: photo.thumbnail_url,
            url: photo.url,
          };
        });
        const skus = {};
        styleObj.skus.forEach((sku) => {
          skus[sku.id] = {
            quantity: sku.quantity,
            size: sku.size,
          };
        });
        let isDefault = false;
        if (styleObj.default_style) {
          isDefault = true;
        }
        return {
          style_id: parseInt(styleObj.id, 10),
          name: styleObj.name,
          original_price: styleObj.original_price,
          'default?': isDefault,
          photos,
          skus,
        };
      });
      return {
        product_id,
        results,
      };
    } catch (err) {
      console.log(`err getting styles for ${product_id}`, err);
      return err;
    }
  };

  const getRelatedProducts = async (product_id) => {
    // use product_id to retrieve related information
    // NOTE: this is where optimization may need to be done to the data as stored
    if (typeof product_id === 'number') {
      product_id = product_id.toString();
    }
    try {
      const relatedProducts = await model.findOne({ id: product_id }).select('related').lean();
      return relatedProducts.related.map((relatedObj) => {
        return parseInt(relatedObj.related_product_id, 10);
      });
    } catch (err) {
      return err;
    }
  };

  return {
    getAllProducts,
    getSpecificProduct,
    getStylesForProduct,
    getRelatedProducts,
  };
};

module.exports = makeDb;
