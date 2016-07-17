var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  _id: { type: String }
},{
    timestamps: true
});

module.exports = categorySchema;
