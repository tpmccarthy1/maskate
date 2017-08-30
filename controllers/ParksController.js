var mongoose = require("mongoose");
var express = require("express");
var app = express();
var path = require('path');

//multer S3 API
var multer = require("multer");
var multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./s3_config.json');
var s3 = new AWS.S3();


var fs = require('fs');


//require Park model
var models = require('../models/parks');
var Park = mongoose.model("Park");

var auth = require("../controllers/AuthController.js");

//create controller for CRUD operations

var parkController = {};

//Add show list of parks function.

parkController.list = function(req, res){
	Park.find({}).exec(function (err, parks){
		if (err){
			console.log("Error", err);
		}
		else{
			res.render("../views/parks/index", {parks: parks});
		}
	});
};


//Add show  parks by state functions
parkController.de = function(req, res){
	Park.find({}).exec(function (err, parks){
		if (err){
			console.log("Error", err);
		}
		else{
			res.render("../views/parks/states/de", {parks: parks});
		}
	});
};

parkController.nj = function(req, res){
	Park.find({}).exec(function (err, parks){
		if (err){
			console.log("Error", err);
		}
		else{
			res.render("../views/parks/states/nj", {parks: parks});
		}
	});
};

parkController.md = function(req, res){
	Park.find({}).exec(function (err, parks){
		if (err){
			console.log("Error", err);
		}
		else{
			res.render("../views/parks/states/md", {parks: parks});
		}
	});
};

parkController.pa = function(req, res){
	Park.find({}).exec(function (err, parks){
		if (err){
			console.log("Error", err);
		}
		else{
			res.render("../views/parks/states/pa", {parks: parks});
		}
	});
};
//Add show single park by id function

parkController.show = function(req, res){
	Park.findOne({_id: req.params.id}).exec(function (err, park){
		if (err) {
			console.log("Error:", err);
		}
		else{
			res.render("../views/parks/show", {park: park});

		}
	});
};

//Add create park function, it just redirects to create the page.

parkController.create = function(req, res) {
  res.render("../views/parks/create");
};




//Add save new park function.

parkController.save = function(req, res, next) {

	   //multer settings	
	 //   var storage =   multer.diskStorage({
  // 		destination: function (req, file, callback) {
  //   		callback(null, './public/uploads');
  // 			},
 	// 	filename: function (req, file, callback) {
  //   		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  // 			}
		// });

	   var cloudStorage = multerS3({
		    s3: s3,
		    bucket: "maskate",
		    contentType: multerS3.AUTO_CONTENT_TYPE,
		    metadata: function(request, file, ab_callback) {
		        ab_callback(null, {fieldname: file.fieldname});
		    },
		    key: function(request, file, ab_callback) {
		        var newFileName = Date.now() + "-" + file.originalname;
		        ab_callback(null, newFileName);
		    },
		});
	   	//upload allf iles in form
  		var upload = multer({ storage : cloudStorage }).any();

		upload(req,res, function(err) {
        // console.log(req.body);
        // console.log(req.files);
        if(err) {
            return res.end(console.log(err));
        }

		var park = new Park ({
	  		name: req.body.name,
	  		street: req.body.street,
	  		town: req.body.town,
	  		county: req.body.county,
	  		state: req.body.state,
	  		hours: req.body.hours,
	  		helmets: req.body.helmets,
	  		description: req.body.description,
	  		imgs: {
	  			img0: req.files[0] ? req.files[0].key : null,
	  			img1: req.files[1] ? req.files[1].key : null,
	  			img2: req.files[2] ? req.files[2].key : null,
	  			img3: req.files[3] ? req.files[3].key : null,
	  		} 
	  		
  		});

   		park.save(function(err) {

   		if(err) {
	      console.log(err);
	      res.render("../views/parks/create");
   		 } else {
	      console.log("Successfully created a park.");
	      id = (park._id);
	      console.log(req.files[0].key);
	      res.redirect("/show/"+id);

   		 }
  		});

    	});

};


//Add edit park by id function, redirects to edit page.

parkController.edit = function(req, res){
	Park.findOne({_id: req.params.id}).exec(function(err, park){
		if (err) {
			console.log("Error:", err);
		}
		else{
			res.render("../views/parks/edit", {park: park});
		}
	});
};

//Add update park function for updating currently edited park.

parkController.update = function(req, res){
	Park.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name, town: req.body.town, state: req.body.state, county: req.body.county, hours: req.body.hours, helmets: req.body.helmets, description: req.body.description}}, {new: true}, function(err, park){
		if (err){
			console.log(err);
			res.render("../views/parks/edit", {park: req.body});
		}
		res.redirect("/show/"+park._id);
	});
};

//Add delete park by id function to remove single park data.

parkController.delete = function (req, res) {
	Park.remove({_id: req.params.id}, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("Park deleted.");
			res.redirect("/")

		}
	});
};

//export park controller as module

module.exports = parkController;