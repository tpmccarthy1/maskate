var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'ejs')
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');


//init mongo 
var mongoUri = process.env.MONGODB_URI;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoUri)
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
app.use('/', parks);

//serve client side js and css
app.use(express.static('public'));

//Passport stuff
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//local variable
app.locals.username;


app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});