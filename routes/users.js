var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Loans = require('../models/loan');
var Verify    = require('./verify');

router.get('/', Verify.verifyAdmin, function(req, res, next) {
  User.find({}, function (err, users) {
        if (err) throw err;
        res.json(users);
    });
});

router.post('/register', function(req, res) {
    
    User.register(new User({ 
                            username : req.body.username,
                            email: req.body.email, 
                            role: req.body.role,
                            password: req.body.password
                         }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        
        user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    success: true
                });
            });
        });
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json(
                  {
                    status: 'Login successful!',
                    success: true,
                    id_user: user._id,
                    name: user.getName(),
                    role: user.role,
                    email: user.email,
                    token: token
                  });
    });
  })(req,res,next);
});

/*
router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});
*/

router.delete('/:userId', Verify.verifyAdmin, function(req, res, next) {
  Loans.find({user: req.params.userId})
        .exec(function (err, loans) {
            if (err) {
                throw err;
            }
        
            if(loans.length==0) {
                User.findByIdAndRemove(req.params.userId, function (err, resp) {        
                    if (err) throw err;
                    res.json(resp);
                });            
            } else {
                res.status(400).json({msg: "There are loans for this user"});
            }
        });
});

router.put('/:userId', Verify.verifyAdmin, function(req, res, next) {
  
    User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, function (err, user) {
        if (err) {
            console.log("Error: " + err);
            throw err;
        } 
        res.json(user);
    });
  
});

router.put('/changepass/:username', Verify.verifyAdmin, function(req, res, next) {
    User.findByUsername(req.params.username).then(function(sanitizedUser){
        if (sanitizedUser){
            sanitizedUser.setPassword(req.body.password, function(){
                sanitizedUser.save();
                res.status(200).json({message: 'password reset successful'});
            });
        } else {
            res.status(500).json({message: 'This user does not exist'});
        }
    },function(err){
        console.error(err);
    });
});

module.exports = router;