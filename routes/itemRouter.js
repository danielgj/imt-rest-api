var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Items = require('../models/item');
var Loans = require('../models/loan');

var itemsRouter = express.Router();
itemsRouter.use(bodyParser.json());

itemsRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Items.find({})
        .populate('brand')
        .populate('category')
        .exec(function (err, categories) {
        if (err) {
            throw err;
        }
        res.json(categories);
    });
})

.post(Verify.verifyAdmin, function (req, res, next) {
    Items.create(req.body, function (err, item) {
        if (err) throw err;
        console.log('item created!');
        var id = item._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the item with id: ' + id);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Items.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

itemsRouter.route('/:itemId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Items.findById(req.params.itemId)
        .populate('brand')
        .populate('category')
        .exec(function (err, item) {
        if (err) throw err;
        res.json(item);
    });
})

.put(Verify.verifyAdmin, function (req, res, next) {
    Items.findByIdAndUpdate(req.params.itemId, {
        $set: req.body
    }, {
        new: true
    }, function (err, category) {
        if (err) throw err;
        res.json(category);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    
    Loans.find({item: req.params.itemId})
        .exec(function (err, loans) {
            if (err) {
                throw err;
            }
        
            if(loans.length==0) {
                Items.findByIdAndRemove(req.params.itemId, function (err, resp) {        
                    if (err) throw err;
                    res.json(resp);
                });            
            } else {
                res.status(400).json({msg: "There are loans with that item"});
            }
    });
    
});


module.exports = itemsRouter;