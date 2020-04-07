const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 500 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// URL virtual
ItemSchema.virtual('url').get(() => {
  return '/inventory/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);
