const Product = require('../models/product');

// Configure elasticsearch mongodb mapping
const stream = Product.synchronize();
let count = 0;

Product.createMapping((err, mapping) => {
  if (err) {
    console.log('Error creating mapping');
    console.log(err);
  } else {
    console.log('Mapping created');
    console.log(mapping);
  }
});

stream.on('data', () => count++ );
stream.on('close', () => console.log(`Indexed ${count} documents`));
stream.on('error', err => console.log(err));

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

const search = (req, res) => {
  res.redirect(`/search?q=${req.body.q}`);
};

const showSearch = (req, res, next) => {
  if (req.query.q) {
    Product.search({
      query_string: { query: req.query.q }
    }, (err, results) => {
      if (err) return next(err);

      const data = results.hits.hits.map(hit => hit);

      res.render('main/search-results', {
        q: req.query.q,
        data: data
      });
    });
  }
};

module.exports = {
  home,
  about,
  showProducts,
  showProduct,
  search,
  showSearch
};
