const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');

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
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      items: function (callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      res.render('category_details', {
        title: 'Details',
        category: results.category,
        items: results.items,
      });
    }
  );
};

exports.createCategoryGet = (req, res) => {
  res.render('category_form', {
    title: 'Create New Category',
  });
};

exports.createCategoryPost = (req, res, next) => {
  [
    // Validate form
    body('name', 'Name required').trim().isLength({ min: 1 }),
    body('description', 'description required').trim().isLength({ min: 1 }),

    // Sanitize form
    sanitizeBody('name').escape(),
    sanitizeBody('description').escape(),

    // Process request
    (req, res, next) => {
      // create new Category
      const category = new Category({
        name: req.body.name,
        description: req.body.description,
      });
      // hangle errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // render form again
        Item.findById(req.params.id)
          .populate('category')
          .exec(function (err, item) {
            // handle err
            if (err) return next(err);
            // render results
            res.render('item_details', {
              title: 'Details',
              item,
              errors: errors.array(),
            });
          });
      } else {
        // save category
        category.save((err, newCategory) => {
          if (err) return next(err);
          // redirect user
          res.redirect(newCategory.url);
        });
      }
    },
  ];
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
