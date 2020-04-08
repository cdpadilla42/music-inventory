const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 500 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// URL virtual
ItemSchema.virtual('url').get(function () {
  return '/inventory/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);
