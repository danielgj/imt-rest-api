var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'].substr(7) || req.headers['Authorization'].substr(7);

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

verifyAdmin = function (req, res, next) {
    // check header or url parameters or post parameters for token
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'].substr(7) || req.headers['Authorization'].substr(7);

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                if(decoded._doc.role == 'admin') {                
                    req.decoded = decoded;
                    next();
                } else {
                    var err = new Error('You are not authorized to perform this operation!');
                    err.status = 403;
                    return next(err);
                }
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
    
};

verifyApprover = function (req, res, next) {
    // check header or url parameters or post parameters for token
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['authorization'].substr(7) || req.headers['Authorization'].substr(7);

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                if(decoded._doc.role == 'approver' || decoded._doc.role == 'admin') {                
                    req.decoded = decoded;
                    next();
                } else {
                    var err = new Error('You are not authorized to perform this operation!');
                    err.status = 403;
                    return next(err);
                }
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
    
};

exports.verifyOrdinaryUser = verifyOrdinaryUser;
exports.verifyAdmin = verifyAdmin;
exports.verifyApprover = verifyApprover;
    
