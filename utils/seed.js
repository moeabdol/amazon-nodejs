const mongoose = require('mongoose');
const faker    = require('faker');
const async    = require('async');

const Category = require('../models/category');
const Product  = require('../models/product');

require('../config/mongoose');

async.waterfall([
  // Clean products collection
  cb => {
    Product.remove()
      .then(() => cb(null))
      .catch(err => cb(err));
  },

  // Get all categories
  cb => {
    Category.find()
      .then(categories => cb(null, categories))
      .catch(err => cb(err));
  },

  // Create fake products for each category
  (categories, cb) => {
    categories.forEach(category => {
      for (let i = 0; i < 30; i++) {
        const newProduct = new Product();

        newProduct.category = category._id;
        newProduct.name = faker.commerce.productName();
        newProduct.price = faker.commerce.price();
        newProduct.image = faker.image.image();

        newProduct.save()
          .then(() => mongoose.connection.close())
          .catch(err => cb(err));
      }
    });
  }
]);
