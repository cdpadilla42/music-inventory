const Item = require('../models/item');
const Category = require('../models/category');
const { body, sanitizeBody, validationResult } = require('express-validator');
const async = require('async');

exports.listItems = (req, res, next) => {
  // get list of items
  Item.find({}).exec((err, items) => {
    // handle errors
    if (err) return next(err);
    // render
    res.render('item_list', {
      title: 'All Items',
      items,
    });
  });
};

exports.itemDetails = (req, res, next) => {
  Item.findById(req.params.id)
    .populate('category')
    .exec(function (err, item) {
      // handle err
      if (err) return next(err);
      // render results
      res.render('item_details', {
        title: 'Details',
        item,
      });
    });
};

exports.createItemGet = (req, res, next) => {
  // get categories
  Category.find({}, (err, categories) => {
    if (err) return next(err);
    res.render('item_form.hbs', {
      title: 'Create New Item',
      categories,
    });
  });
};

exports.createItemPost = [
  // validate
  body('name', 'Name required')
    .trim()
    .isLength({ min: 1 })
    .isAlphanumeric()
    .withMessage('Must be Alphanumeric'),
  body('description', 'Description required').trim().isLength({ min: 1 }),
  body('price', 'Price must be a number').isNumeric(),
  body(
    'stock',
    'Stock must be a number. Input 0 for out of stock item'
  ).isNumeric(),

  // sanitize
  sanitizeBody('name').escape(),
  sanitizeBody('description').escape(),
  sanitizeBody('category').escape(),
  sanitizeBody('price').escape(),
  sanitizeBody('stock').escape(),

  // process request
  (req, res, next) => {
    // create new item
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });
    // handle errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return to form w/ errors
      Category.find({}, (err, categories) => {
        if (err) return next(err);
        res.render('item_form.hbs', {
          title: 'Create New Item',
          categories,
          errors: errors.array(),
        });
      });
    } else {
      // save upon success
      item.save((err, newItem) => {
        if (err) return next(err);
        res.redirect(newItem.url);
      });
    }
  },
];

exports.itemUpdateGet = (req, res) => {
  async.parallel(
    {
      item: function (callback) {
        Item.findById(req.params.id).exec(callback);
      },
      categories: function (callback) {
        Category.find({}).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      // render page w/ item
      res.render('item_form', {
        title: 'Update Item',
        item: results.item,
        categories: results.categories,
      });
    }
  );
};

exports.itemUpdatePost = [
  // validate
  body('name', 'Name required')
    .trim()
    .isLength({ min: 1 })
    .isAlphanumeric()
    .withMessage('Must be Alphanumeric'),
  body('description', 'Description required').trim().isLength({ min: 1 }),
  body('price', 'Price must be a number').isNumeric(),
  body(
    'stock',
    'Stock must be a number. Input 0 for out of stock item'
  ).isNumeric(),

  // sanitize
  sanitizeBody('name').escape(),
  sanitizeBody('description').escape(),
  sanitizeBody('category').escape(),
  sanitizeBody('price').escape(),
  sanitizeBody('stock').escape(),

  // Process
  (req, res, next) => {
    // Create item
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });
    // handle errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return to form w/ errors
      Category.find({}, (err, categories) => {
        if (err) return next(err);
        res.render('item_form.hbs', {
          title: 'Create New Item',
          item,
          categories,
          errors: errors.array(),
        });
      });
    } else {
      // save upon success
      Item.findByIdAndUpdate(req.params.id, item, {}, (err, newItem) => {
        if (err) return next(err);
        res.redirect(newItem.url);
      });
    }
  },
];

exports.itemDeleteGet = (req, res) => {
  res.send('NOT IMPLEMENTED: itemDeleteGet');
};

exports.itemDeletePost = (req, res) => {
  res.send('NOT IMPLEMENTED: itemDeletePost');
};
