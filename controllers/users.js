const passport = require('passport');

const User = require('../models/user');

const signup = (req, res) => {
  res.render('users/signup', {
    name: '',
    email: ''
  });
};

const create = (req, res, next) => {
  const newUser = new User();
  const errors = [];

  if (!req.body.name) errors.push({ text: 'Name must be provided!' });
  if (!req.body.email) errors.push({ text: 'Email must be provided!' });
  if (!req.body.password) errors.push({ text: 'Password must be provided!' });

  newUser.profile.name = req.body.name;
  newUser.email        = req.body.email;
  newUser.password     = req.body.password;

  if (errors.length > 0) return res.render('users/signup', {
    errors: errors,
    name: req.body.name,
    email: req.body.email
  });

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        req.flash('error', 'Email already exists!');
        return res.redirect('/users/signup');
      }

      newUser.save()
        .then(() => {
          req.flash('success', 'Signed up successfully.');
          res.redirect('/');
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

const signin = (req, res) => {
  if (req.user) {
    req.flash('success', 'You\'re already signed in');
    return res.redirect('/');
  }

  res.render('users/signin');
};

const enter = passport.authenticate('local', {
  successRedirect: '/users/profile',
  successFlash: true,
  failureRedirect: '/users/signin',
  failureFlash: true
});

const profile = (req, res) => {
  // User.findById(req.user._id)
  //   .then(user => res.render('users/profile')
  //   .catch(err => next(err));
  res.render('users/profile');
};

module.exports = {
  signup,
  create,
  signin,
  enter,
  profile
};
