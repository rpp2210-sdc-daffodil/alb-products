# Products Microservice

## Overview

This repo contains the back-end microservice for the Atelier website products. It has API endpoints for the complete product list, individual product's complete information, the styles for each individual product, and the related products for the specific individual products.

## Table of Contents
* [Description](#Description)
* [Getting Started](#Getting-Started)
* [Usage](#Usage)
* [Tech Stack](#Tech-Stack)
* [Accompanying Microservices](#Accompanying-Microservices)

## Description

This microservice is designed to provide the necessary endpoints for retrieving information about products for the Atelier retailer. The server offers four endponits that allow users to retrieve product information, styles, and related products.

The endpoints are:
* **'/products'**: This endpoint provides a complete list of all the products in the Atelier Retailer catalog. It returns an array of product objects, each of which contains basic information about a product: ID, name, slogan, description, category, and default price.
* **'/products/:product_id'**:  This endpoint provides detailed information about a single product specified by product_id. It returns an object containing all the information available about the product, including its ID, name, slogan, description, features, and default price.
* **'/products/:product_id/styles'**: This endpoint provides information about the styles available for a single product specified by product_id. It returns an object containing an array of style objects, each of which contains information about a specific style for the product, such as its ID, name, original price, sale price, photos, and a boolean indicating if it is the default style for that product.
* **'/products/:product_id/related'**: This endpoint provides information about the related products for a single product specified by product_id. It returns an array of product IDs that are related to the specified product.

## Getting Started

To use the Atelier products microservice server, you need to have Node.js and npm installed on your system. You can download Node.js from the [official website](https://nodejs.org/en).
1. Clone the repository
```
git clone https://github.com/rpp2210-sdc-daffodil/alb-products.git
```
2. Install the dependencies using npm
```
cd alb-products
npm install
```
3. Start Redis caching server
```
redis-server --daemonize yes
```
4. Start the server
```
npm start
```

## Usage
Once the server is running, you can use the endpoints to retrieve information about products
* a **GET** request to **'/products'** will return an array of product objects
```
[
  {
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will haveyou blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "69",
  },
  // ...
]
```
* a **GET** request to **'/products/:product_id'** requires the target product_id as a query parameter and returns an object with all the information about the target product
```
{
  "id": 11,
  "name": "Air Minis 250",
  "slogan": "Full court support",
  "description": This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  "category": "Basketball shoes",
  "default_price": "100",
  "features": [
    {
      "feature": "Sole",
      "value": "Rubber"
    },
    // ...
  ],
}
```
* a **GET** request to **'/products/:product_id/styles'** requires the target product_id as a query parameter and returns an object containing an array of style objects (under the key 'results')
```
{
  "product_id": "1",
  "results": [
    {
      "style_id": 1,
      "name": "Forest Green & Black",
      "original_price": "140",
      "sale_price": "0",
      "default?": true,
      "photos": [
        {
          "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_1_photo_number.jpg"
        },
        {
          "thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_1_photo_number.jpg"
        },
        // ...
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        // ...
      },
    },
    // ...
  ]
```
* a **GET** request to **'/products/:product_id/related** requires the target product_id as a query parameter and returns an array of product ids corresponding to related products
```
[
  2,
  3,
  8,
  7
]
```
**Note:** The performance is significantly improved upon warming up the cache before regular use and using NGINX load balancing across three or more servers.

## Tech Stack
![ReactJS](https://img.shields.io/badge/React-808080?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-808080.svg?style=for-the-badge&logo=nodemon&logoColor=008000)
![Express](https://img.shields.io/badge/Express.js-808080?style=for-the-badge&logo=express&logoColor=00ff00)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-808080?style=for-the-badge&logo=Jest&logoColor=ffa500)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)

## Accompanying Microservices
* [Reviews/Ratings](https://github.com/rpp2210-sdc-daffodil/sk-ratings)
* [Questions & Answers](https://github.com/rpp2210-sdc-daffodil/NM-QA)
