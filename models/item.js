var mongoose = require('mongoose');
var Category = require('./category');
var Brand = require('./brand');

var Schema = mongoose.Schema;

var itemSchema = new Schema({

  name: { type: String, required: true },
  category: Category.categorySchema,
  brand: Brand.brandSchema,
  model: {type: String},
  os: {type: String},
  serial: {type: String},
  owner: {type: String},
  notes: {type: String}

},{
    timestamps: true
});


itemSchema.index({ name: 'text' });


itemSchema.virtual('displayName').get(function() {
  return this.name + "(" + this.category._id + " " + this.brand._id + ")";
});

itemSchema.set('toObject', { virtuals: true });
itemSchema.set('toJSON', { virtuals: true });

module.exports = itemSchema;
