const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');

const config = require('../config/config');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }
});

ProductSchema.plugin(mongoosastic, {
  hosts: [config.es]
});

module.exports = mongoose.model('Product', ProductSchema);
