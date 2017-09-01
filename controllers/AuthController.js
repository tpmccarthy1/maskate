var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('../views/parks/index', { user : req.user, username: req.user.username });

};

// Go to registration page
userController.register = function(req, res) {
    if(req.user){
      res.redirect('/');
    } 
  res.render('../views/users/register');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('../views/users/register', { user : user });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/login');
    });
  });
};

//Check if use is logged in middleware
userController.loggedIn = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Go to login page
userController.login = function(req, res) {
  if (req.user) {
       res.redirect('/');
    } 
  res.render('../views/users/login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    console.log(req.user);
    res.redirect('/')
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};


module.exports = userController;