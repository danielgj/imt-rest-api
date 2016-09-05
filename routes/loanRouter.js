var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Loans = require('../models/loan');

var loanRouter = express.Router();
loanRouter.use(bodyParser.json());

loanRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Loans.find({})
        .populate('item')
        .exec(function (err, loans) {
        if (err) throw err;
        res.json(loans);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Loans.create(req.body, function (err, loan) {
        if (err) throw err;
        console.log('Loan created!');
        var id = loan._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the loan with id: ' + id);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Loans.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

loanRouter.route('/open') //Fix this
.get(Verify.verifyOrdinaryUser, function (req, res, next) {    
    Loans.find({$or:[ {state:'Requested'}, {state:'Ongoing'}, {state: 'ClosePending'}]})
        .populate('item')
        .populate('user')
        .exec(function (err, loans) {
        if (err) throw err;
        res.json(loans);
    });
});

loanRouter.route('/pending') //Fix this
.get(Verify.verifyOrdinaryUser, function (req, res, next) {    
    Loans.find({$or:[ {state:'Requested'},{state: 'ClosePending'}]})
        .populate('item')
        .populate('user')
        .exec(function (err, loans) {
        if (err) throw err;
        res.json(loans);
    });
});

loanRouter.route('/user/:userId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Loans.find({user: req.params.userId})
        .populate('item')
        .populate('user')
        .exec(function (err, loans) {
        if (err) throw err;
        res.json(loans);
    });
});


loanRouter.route('/:loanId')
.put(Verify.verifyAdmin, function (req, res, next) {
    Loans.findByIdAndUpdate(req.params.loanId, {
        $set: req.body
    }, {
        new: true
    }, function (err, loan) {
        if (err) throw err;
        res.json(loan);
    });
})

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Loans.findById(req.params.loanId)
        .populate('item')
        .populate('user')
        .exec(function (err, loans) {
        if (err) throw err;
        res.json(loans);
    });
});




module.exports = loanRouter;