const express = require('express');

const main = require('../controllers/main');

const router = express.Router();

router.get('/', main.home);
router.get('/about', main.about);
router.get('/products/:id', main.showProducts);
router.get('/product/:id', main.showProduct);

module.exports = router;
