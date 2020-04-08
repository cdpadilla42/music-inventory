const Item = require('../models/item');
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

exports.createItemGet = (req, res) => {
  res.send('NOT IMPLEMENTED: createItemGet');
};

exports.createItemPost = (req, res) => {
  res.send('NOT IMPLEMENTED: createItemPost');
};

exports.itemUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: itemUpdateGet');
};

exports.itemUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: itemUpdatePost');
};

exports.itemDeleteGet = (req, res) => {
  res.send('NOT IMPLEMENTED: itemDeleteGet');
};

exports.itemDeletePost = (req, res) => {
  res.send('NOT IMPLEMENTED: itemDeletePost');
};
