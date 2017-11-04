const router = require('express').Router();

const Product = require('../models/product');

router.post('/search', (req, res, next) => {
  Product.search({ query_string: { query: req.body.search_term } },
    (err, data) => {
      if (err) return next(err);

      res.status(200).json(data);
    });
});

module.exports = router;
