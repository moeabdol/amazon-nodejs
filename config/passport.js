const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport) {
  // Serialize user into session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user from session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Configure local strategy
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) return done(null, false, req.flash('error', 'No user found'));

        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);
          if (!isMatch) {
            return done(null, false, req.flash('error', 'Password incorrect'));
          }

          done(null, user, req.flash('success', 'Signed in successfully'));
        });
      })
      .catch(err => done(err));
  }));

  // Method to check if user is authenticated
  // const isAuthenticated = (req, res, next) => {
  //   if (req.isAuthenticated()) return next();
  //
  //   req.flash('error', 'You need to login');
  //   res.redirect('/login');
  // };
};
