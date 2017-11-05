const Product = require('../models/product');
const Cart    = require('../models/cart');

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

const home = (req, res, next) => {
  if (!req.user) return res.render('main/home');

  paginate(req, res, next);
};

const paginate = (req, res, next) => {
  const PER_PAGE = 9;
  let page = req.params.page--;

  Product.find()
    .skip(PER_PAGE * page)
    .limit(PER_PAGE)
    .populate('category')
    .then(products => {
      Product.count()
        .then(count => res.render('main/product-main', {
          count,
          products,
          pages: count / PER_PAGE,
          page: page++
        }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

const getPage = (req, res, next) => {
  paginate(req, res, next);
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

const addProductToCart = (req, res, next) => {
  Cart.findOne({ owner: req.user._id })
    .then(cart => {
      cart.items.push({
        item: req.body.productId,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity)
      });

      cart.total = (cart.total + parseFloat(req.body.price)).toFixed(2);

      cart.save()
        .then(() => res.redirect('/cart'))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

module.exports = {
  home,
  about,
  showProducts,
  showProduct,
  search,
  showSearch,
  getPage,
  addProductToCart
};
