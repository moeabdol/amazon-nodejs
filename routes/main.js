const express = require('express');

const main = require('../controllers/main');

const router = express.Router();

router.get('/', main.home);
router.get('/about', main.about);
router.get('/products/:id', main.showProducts);
router.get('/product/:id', main.showProduct);
router.post('/search', main.search);
router.get('/search', main.showSearch);
router.get('/page/:page', main.getPage);

module.exports = router;
