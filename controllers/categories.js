const Category = require('../models/category');

const add = (req, res) => {
  res.render('admin/add-categories');
};

const create = (req, res, next) => {
  const newCategory = new Category();
  const errors = [];

  if (!req.body.name) errors.pusth({ text: 'Name must be provided.' });

  if (errors.length > 0) return res.render('admin/add-category', { errors });

  newCategory.name = req.body.name;

  Category.save()
    .then(() => {
      req.flash('success', 'Category added successfully');
      res.redirect('/admin/add-category');
    })
    .catch(err => next(err));
};

module.exports = {
  add,
  create
};
