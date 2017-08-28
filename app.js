var express = require("express");
var app = express();
var port = 3000;
app.set('view engine', 'ejs')
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');


/*
 * I’m sharing my credential here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * MONGOLAB_URI=mongodb://example:example@ds053312.mongolab.com:53312/todolist
 * 'mongodb://example:example@ds053312.mongolab.com:53312/todolist'
 */



//init mongo 
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://tom:sayrebrook1@ds161913.mlab.com:61913/maskate")
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));

//authentication stuff


// //set up express session
app.use(require('express-session')({
    secret: 'maskate',
    resave: false,
    saveUninitialized: false
}));


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//require parks routes
var parks = require('./routes/parks');
app.use('/parks', parks);

//serve client side js and css
app.use(express.static('public'));
app.use(express.static('uploads'));


//Passport stuff
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});