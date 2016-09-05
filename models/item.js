var mongoose = require('mongoose');
var Category = require('./category');
var Brand = require('./brand');

var Schema = mongoose.Schema;

var itemSchema = new Schema({

  name: { type: String, required: true },
  category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
            },
  brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand'
            },
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
  return this.name + " (" + this.category.category + " " + this.brand.brand + ")";
});

itemSchema.set('toObject', { virtuals: true });
itemSchema.set('toJSON', { virtuals: true });


var Items = mongoose.model('Item', itemSchema);

// make this available to our Node applications
module.exports = Items;
