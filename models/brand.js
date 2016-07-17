var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
  _id: { type: String }
}, {
    timestamps: true
});

module.exports = brandSchema;
