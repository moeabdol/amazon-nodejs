const Product = require('../models/product');

const home = (req, res) => {
  res.render('main/home');
};

const about = (req, res) => {
  res.render('main/about');
};

const showProducts = (req, res, next) => {
  Product.find({ category: req.params.id })
    .populate('category')
    .then(products => res.render('main/category', { products }))
    .catch(err => next(err));
};

const showProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.render('main/product', { product }))
    .catch(err => next(err));
};

module.exports = {
  home,
  about,
  showProducts,
  showProduct
};
