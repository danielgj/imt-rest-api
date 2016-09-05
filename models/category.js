var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  category: { type: String }
},{
    timestamps: true
});

var Categories = mongoose.model('Category', categorySchema);

// make this available to our Node applications
module.exports = Categories;
