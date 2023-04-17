# Products Microservice

## Overview

This repo contains the back-end microservice for the Atelier website products. It has API endpoints for the complete product list, individual product's complete information, the styles for each individual product, and the related products for the specific individual products.

## Description

This microservice is designed to provide the necessary endpoints for retrieving information about products for the Atelier retailer. The server offers four endponits that allow users to retrieve product information, styles, and related products.

The endpoints are:
* '/products': This endpoint provides a complete list of all the products in the Atelier Retailer catalog. It returns an array of product objects, each of which contains basic information about a product: ID, name, slogan, description, category, and default price.
* '/products/:product_id':  This endpoint provides detailed information about a single product specified by product_id. It returns an object containing all the information available about the product, including its ID, name, slogan, description, features, and default price.
* '/products/:product_id/styles': This endpoint provides information about the styles available for a single product specified by product_id. It returns an object containing an array of style objects, each of which contains information about a specific style for the product, such as its ID, name, original price, sale price, photos, and a boolean indicating if it is the default style for that product.
*'/products/:product_id/related': This endpoint provides information about the related products for a single product specified by product_id. It returns an array of product IDs that are related to the specified product.

