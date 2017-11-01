const User = require('../models/user');

const create = (req, res, next) => {
  const user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  user.save()
    .then(() => {
      console.log('User created');
      res.send('user created');
    })
    .catch(err => next(err));
};

module.exports = {
  create
};
