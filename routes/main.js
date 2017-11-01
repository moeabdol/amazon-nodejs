const express = require('express');

const main = require('../controllers/main');

const router = express.Router();

router.get('/', main.home);
router.get('/about', main.about);

module.exports = router;
