var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
  brand: { type: String }
}, {
    timestamps: true
});

var Brands = mongoose.model('Brand', brandSchema);

// make this available to our Node applications
module.exports = Brands;
