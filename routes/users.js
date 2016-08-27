var express = require('express');
var passport = require('passport');
var User = require('models/user');
var router = express.Router({mergeParams: true});
var jwt = require('jsonwebtoken');
var secret = require('config/secret');

router.get('/', function(req, res){
  res.render('users/login',{
  });
});


router.get('/register', function(req, res) {
  res.render('users/register', { });
});

router.post('/register', function(req, res) {
  var user = new User({ 
    email: req.body.user.email 
  });
  User.register(user, 
    req.body.user.password, 
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render('users/register', { user : user });
      }
      res.redirect('/login');
    }
  );
});

router.get('/login', function(req, res){
  res.render('users/login',{
    user : req.user
  });
});

router.post('/login',passport.authenticate('local'),function(req, res) {
  // Create token if the password matched and no error was thrown
  var user = { _id: req.user._id };
  var token = jwt.sign(user, secret, {
    expiresIn: 10080 // in seconds
  });
  res.json({ success: true, token: 'JWT ' + token });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
