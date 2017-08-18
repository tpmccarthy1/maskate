var express = require('express');
var router = express.Router();

var multer = require("multer");
var upload = multer({dest: "./uploads"});




// require parks controller
var park = require("../controllers/ParksController.js");

//Add route for all CRUD functions
//Get all parks
router.get('/', park.list);

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
router.get('/create', park.create);

//Save park
router.post('/save', park.save);

//Edit park
router.get('/edit/:id', park.edit);

//Update park
router.post('/update/:id', park.update);

//Delete park
router.post('/delete/:id', park.delete);

//export as module

module.exports = router;