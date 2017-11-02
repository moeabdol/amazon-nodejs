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

  newUser.profile.name    = req.body.name;
  newUser.email           = req.body.email;
  newUser.password        = req.body.password;
  newUser.profile.picture = newUser.gravatar();

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
        .then(user => {
          req.logIn(user, (err) => {
            if (err) return next(err);

            req.flash('success', 'Signed up successfully.');
            res.redirect('/users/profile');
          });
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

const signout = (req, res) => {
  req.logout();
  res.redirect('/');
};

const editProfile = (req, res) => {
  res.render('users/edit-profile');
};

const updateProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then(user => {
      if (req.body.name) user.profile.name = req.body.name;
      if (req.body.address || req.body.address === '') {
        user.address = req.body.address;
      }

      user.save()
        .then(() => {
          req.flash('success', 'User updated successfully');
          res.redirect('/users/profile');
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

module.exports = {
  signup,
  create,
  signin,
  enter,
  profile,
  signout,
  editProfile,
  updateProfile
};
