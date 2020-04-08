const express = require('express');
const router = express.router();
//TODO: Controller
const categoryController = require('');
const itemController = require('');

/// Cateories ///

// GET request for list of categories
router.get('/categories', listCategories);

// GET request for category details
router.get('/category/:id', categoryDetails);

// GET request for creating category
router.get('/category/create', createCategoryGet);

// POST request for creating category
router.post('/category/create', createCategoryPost);

// GET request for updating category
router.get('/category/:id/update', categoryUpdateGet);

// POST request for updating category
router.post('/category/:id/update', categoryUpdatePost);

// GET request for deleting category
router.get('/category/:id/delete', categoryDeleteGet);

// POST request for deleting category
router.post('/category/:id/delete', categoryDeletePost);

/// Items ///

// GET request for list of items
router.get('/items', listItems);

// GET request for item details
router.get('/item/:id', itemDetails);

// GET request for creating item
router.get('/item/:id/create', createItemGet);

// POST request for creating item
router.post('/item/:id/create', createItemPost);

// GET request for updating item
router.get('/item/:id/update', itemUpdateGet);

// POST request for updating item
router.post('/item/:id/update', itemUpdatePost);

// GET request for deleting item
router.get('/item/:id/delete', itemDeleteGet);

// POST request for deleting item
router.get('/item/:id/delete', itemDeletePost);
