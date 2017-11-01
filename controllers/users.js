const User = require('../models/user');

const create = (req, res, next) => {
  const newUser = new User();

  newUser.profile.name = req.body.name;
  newUser.email        = req.body.email;
  newUser.password     = req.body.password;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        console.log('email already exists');
        return res.redirect('/signup');
      }

      newUser.save()
        .then(() => {
          console.log('User created');
          res.status(201).json('New user has been created');
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

module.exports = {
  create
};
