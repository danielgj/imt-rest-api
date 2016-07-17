var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Brands = require('../models/brand');

var brandRouter = express.Router();
brandRouter.use(bodyParser.json());

brandRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Brands.find({})
        .exec(function (err, brands) {
        if (err) throw err;
        res.json(brands);
    });
})

.post(Verify.verifyAdmin, function (req, res, next) {
    Brands.create(req.body, function (err, brand) {
        if (err) throw err;
        console.log('Brand created!');
        var id = brand._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the brand with id: ' + id);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Brands.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

brandRouter.route('/:brandId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Brands.findById(req.params.brandId)
        .exec(function (err, brand) {
        if (err) throw err;
        res.json(brand);
    });
})

.put(Verify.verifyAdmin, function (req, res, next) {
    Brands.findByIdAndUpdate(req.params.brandId, {
        $set: req.body
    }, {
        new: true
    }, function (err, brand) {
        if (err) throw err;
        res.json(brand);
    });
})

.delete(Verify.verifyAdmin, function (req, res, next) {
    Brands.findByIdAndRemove(req.params.brandId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});


module.exports = brandRouter;