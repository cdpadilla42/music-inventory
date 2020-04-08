const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');
const itemController = require('../controllers/item-controller');

/// Cateories ///

// GET request for list of categories
router.get('/categories', categoryController.listCategories);

// GET request for creating category
router.get('/category/create', categoryController.createCategoryGet);

// POST request for creating category
router.post('/category/create', categoryController.createCategoryPost);

// GET request for updating category
router.get('/category/:id/update', categoryController.categoryUpdateGet);

// POST request for updating category
router.post('/category/:id/update', categoryController.categoryUpdatePost);

// GET request for deleting category
router.get('/category/:id/delete', categoryController.categoryDeleteGet);

// POST request for deleting category
router.post('/category/:id/delete', categoryController.categoryDeletePost);

// GET request for category details
router.get('/category/:id', categoryController.categoryDetails);

/// Items ///

// GET request for list of items
router.get('/items', itemController.listItems);

// GET request for creating item
router.get('/item/create', itemController.createItemGet);

// POST request for creating item
router.post('/item/create', itemController.createItemPost);

// GET request for updating item
router.get('/item/:id/update', itemController.itemUpdateGet);

// POST request for updating item
router.post('/item/:id/update', itemController.itemUpdatePost);

// GET request for deleting item
router.get('/item/:id/delete', itemController.itemDeleteGet);

// POST request for deleting item
router.get('/item/:id/delete', itemController.itemDeletePost);

// GET request for item details
router.get('/item/:id', itemController.itemDetails);

module.exports = router;
