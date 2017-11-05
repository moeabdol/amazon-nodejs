const Cart = require('../models/cart');

const cartMiddleware = (req, res, next) => {
  if (req.user) {
    let total = 0;

    Cart.findOne({ owner: req.user._id })
      .then(cart => {
        if (cart) {
          cart.items.forEach(item => total += item.quantity);
          res.locals.cart = total;
        } else {
          res.locals.cart = null;
        }
        next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
};

module.exports = {
  cartMiddleware
};
