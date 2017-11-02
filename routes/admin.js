const router = require('express').Router();

const categories = require('../controllers/categories');

router.get('/categories/add', categories.add);
router.post('/categories/add', categories.create);

module.exports = router;
