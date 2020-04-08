#! /usr/bin/env node

console.log(
  'This script populates some test items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Item = require('./models/item');
var Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];

function categoryCreate(name, description, cb) {
  categoryDetail = { name, description };

  var category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, price, category, stock, cb) {
  itemDetail = {
    name,
    description,
    price,
    category,
    stock,
  };

  var item = new Item(itemDetail);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);
    items.push(item);
    cb(null, item);
  });
}

function createItems(callback) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          'Alto Saxophone',
          'Greatest instrument around',
          4000,
          categories[0],
          8,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Flute',
          'Light and magical',
          7000,
          categories[0],
          5,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Clarinet',
          'Bright, energetic, and flexible!',
          7000,
          categories[0],
          12,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Trumpet',
          'Big sound, big attitude!',
          5000,
          categories[1],
          8,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Trombone',
          'Bigger sound, bigger attitude!',
          6000,
          categories[1],
          4,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Tuba',
          'Biggest sound, biggest attitude??',
          11000,
          categories[1],
          2,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Violin',
          'Light, virtuosic, and well loved',
          12000,
          categories[2],
          8,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Ukelele',
          'Calm, relaxing, and easy to pick up',
          90,
          categories[2],
          0,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Guitar',
          'Best seller! Versatile and iconic!',
          350,
          categories[2],
          15,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Steinway Grand Piano',
          'Rich sound, fully resonant, and great at parties',
          74300,
          categories[3],
          2,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Yamaha Upright Piano',
          'A staple in every home! Great for families.',
          8000,
          categories[3],
          0,
          callback
        );
      },
      function (callback) {
        itemCreate(
          'Roland Juno 60 Synthesizer',
          'Cutting edge of new sound! Essential for modern pop outfits',
          1800,
          categories[3],
          8,
          callback
        );
      },
    ],
    // optional callback
    callback
  );
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          'Woodwinds',
          'Reed instruments for a variety of colorful sounds.',
          callback
        );
      },
      function (callback) {
        categoryCreate('Brass', 'Loud, proud, and triumphant', callback);
      },
      function (callback) {
        categoryCreate(
          'Strings',
          'Dynamic! Instruments that are strummed, plucked, and bowed',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Keyboard',
          'Ebony and Ivory, ranging from classic instruments to modern electronic set ups',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('items: ' + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
