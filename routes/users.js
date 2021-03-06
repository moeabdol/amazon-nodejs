const express = require('express');

const users = require('../controllers/users');

const router = express.Router();

router.get('/signup', users.signup);
router.post('/signup', users.create);
router.get('/signin', users.signin);
router.post('/signin', users.enter);
router.get('/profile', users.profile);
router.get('/signout', users.signout);
router.get('/edit-profile', users.editProfile);
router.post('/edit-profile', users.updateProfile);

module.exports = router;
