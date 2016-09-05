var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Brands = require('../models/brand');
var Items = require('../models/item');

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

.put(Verify.verifyAdmin, function (req, res, next) {
    Brands.update(req.body, function (err, brand) {
        if (err) throw err;
        console.log('Brand updated!');
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Updated the brand with id: ' + req.body._id);
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
    
    Items.find({brand: req.params.brandId})
        .exec(function (err, items) {
            if (err) {
                throw err;
            }
        
            if(items.length==0) {
                Brands.findByIdAndRemove(req.params.brandId, function (err, resp) {        
                    if (err) throw err;
                    res.json(resp);
                });            
            } else {
                res.status(400).json({msg: "There are items with that brand"});
            }
        });
    
});


module.exports = brandRouter;