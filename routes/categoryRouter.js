var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Categories = require('../models/category');

var categoriesRouter = express.Router();
categoriesRouter.use(bodyParser.json());

categoriesRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Categories.find({})
        .exec(function (err, categories) {
        if (err) throw err;
        res.json(categories);
    });
})

.post(Verify.verifyAdmin, function (req, res, next) {
    Categories.create(req.body, function (err, category) {
        if (err) throw err;
        console.log('category created!');
        var id = category._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the category with id: ' + id);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Categories.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

categoriesRouter.route('/:categoryId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Categories.findById(req.params.categoryId)
        .exec(function (err, category) {
        if (err) throw err;
        res.json(category);
    });
})

.put(Verify.verifyAdmin, function (req, res, next) {
    Categories.findByIdAndUpdate(req.params.categoryId, {
        $set: req.body
    }, {
        new: true
    }, function (err, category) {
        if (err) throw err;
        res.json(category);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Categories.findByIdAndRemove(req.params.categoryId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});


module.exports = categoriesRouter;