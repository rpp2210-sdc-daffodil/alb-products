/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
const mongoose = require('mongoose');

const makeDb = (model) => {
  const getAllProducts = async () => {
    try {
      const allProducts = await model.find({ id: { $lte: 1000 } });
      return allProducts.map((product) => {
        return {
          id: parseInt(product.id, 10),
          name: product.name,
          slogan: product.slogan,
          description: product.description,
          category: product.category,
          default_price: product.default_price,
        };
      });
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
      const productInfo = await model.findOne({ id: product_id });
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
      const product = await model.findOne({ id: product_id });
      const results = product.styles.map((styleObj) => {
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
      console.log(`err getting styles for ${product_id}`);
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
      const relatedProducts = await model.findOne({ id: product_id });
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

// aggregate doc into proper shape
// const results = await model.aggregate([
//   { '$match': { 'id': product_id }},
//   { '$project': {
//     'style_id': '$id',
//     'name': '$name',
//     'original_price': '$original_price',
//     'sale_price': '$sale_price',
//     'default?': '$default_style',
//     'photos': [{
//       'thumbnail_url': '$photos.thumbnail_url',
//       'url': 'photos.$url'
//     }],
//     'skus': {
//       '$skus.id': {
//         'quantity': '$skus.quantity',
//         'size': '$skus.size'
//       }
//     }
//   }}
// ]);
// const styleInfo = await model.findOne({ id: product_id }, 'styles');
// return {
//   product_id,
//   results,
// };
