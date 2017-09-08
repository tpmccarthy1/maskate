var express = require('express');
var router = express.Router();

var multer = require("multer");
var upload = multer({dest: "./uploads"});
var passport = require('passport');


// require parks controller
var park = require("../controllers/ParksController.js");
var auth = require("../controllers/AuthController.js");

//Add route for all CRUD functions
//Get all parks
router.get('/', park.list, auth.home);

//Get all DE parks
router.get('/states/de', park.de);

//Get all NJ parks
router.get('/states/nj', park.nj);

//Get all PA parks
router.get('/states/pa', park.pa);

//Get all MD parks
router.get('/states/md', park.md);

//Get park by id
router.get('/show/:id', park.show);

//Create new park 
router.get('/create', auth.loggedIn, park.create);

//Save park
router.post('/save', park.save);

//Edit park
router.get('/edit/:id', park.edit);

//Update park
router.post('/update/:id', park.update);

//Delete park
router.post('/delete/:id', park.delete);

//Auth routes
// restrict index for logged in user only
// router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for login error action
router.get('/errlogin', auth.loginErr);

// route for logout action
router.get('/logout', auth.logout);


//export as module

module.exports = router;