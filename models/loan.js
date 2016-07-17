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
          this.state = 'Encurso';
          return v;
        }
      },
  endDate: {
            type: Date,
            set: function(v) {
              this.state = 'Cerrado';
              return v;
            }
          },
  state: {
    type: String,
    enum: ['Solicitado', 'Encurso', 'Rechazado', 'PdteCierre', 'Cerrado'],
    required: true
  }
},{
    timestamps: true
});

module.exports = loanSchema;
