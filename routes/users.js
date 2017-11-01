const express = require('express');

const users = require('../controllers/users');

const router = express.Router();

router.get('/signup', users.add);
router.post('/', users.create);

module.exports = router;
