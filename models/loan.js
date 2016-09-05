var mongoose = require('mongoose');
var Item = require('./item');
var User = require('./user');

var Schema = mongoose.Schema;

var loanSchema = new Schema({
  item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
  user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
  comments: {
          type: String
        },
  requestDate: {
        type: Date,
        required: true
        },
  initDate: {
        type: Date,
        set: function(v) {
          this.state = 'Ongoing';
          return v;
        }
      },
  endDate: {
            type: Date,
            set: function(v) {
              this.state = 'Closed';
              return v;
            }
          },
  state: {
    type: String,
    enum: ['Requested', 'Ongoing', 'Rejected', 'ClosePending', 'Closed'],
    required: true
  }
},{
    timestamps: true
});

var Loans = mongoose.model('Loan', loanSchema);

// make this available to our Node applications
module.exports = Loans;
