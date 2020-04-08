const Category = require('../models/category');

exports.listCategories = (req, res, next) => {
  // get list of categories
  Category.find({}).exec((err, results) => {
    // check for errors
    if (err) return next(err);
    // render page
    res.render('category_list', { title: 'Categories', categories: results });
  });
};

exports.categoryDetails = (req, res, next) => {
  // get category
  Category.findById(req.params.id).exec((err, results) => {
    // check for errors
    if (err) return next(err);
    //render details
    res.render('category_details', {
      title: 'Details',
      category: results,
    });
  });
};

exports.createCategoryGet = (req, res) => {
  res.send('NOT IMPLEMENTED: createCategoryGet');
};

exports.createCategoryPost = (req, res) => {
  res.send('NOT IMPLEMENTED: createCategoryPost');
};

exports.categoryUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: categoryUpdateGet');
};

exports.categoryUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: categoryUpdatePost');
};

exports.categoryDeleteGet = (req, res) => {
  res.send('NOT IMPLEMENTED: categoryDeleteGet');
};

exports.categoryDeletePost = (req, res) => {
  res.send('NOT IMPLEMENTED: categoryDeletePost');
};
