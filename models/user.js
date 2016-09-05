var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user','approver','admin'],
        required: true
    }
},{
    timestamps: true
});

userSchema.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);