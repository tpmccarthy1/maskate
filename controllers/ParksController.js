var mongoose = require("mongoose");
var express = require("express");
var app = express();


//require Park model
var models = require('../models/parks');
var Park = mongoose.model("Park");

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

parkController.save = function(req, res) {
  var park = new Park(req.body);

  park.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/parks/create");
    } else {
      console.log("Successfully created a park.");
      res.redirect("/parks/show/"+park._id);

    }
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
		res.redirect("/parks/show/"+park._id);
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
			res.redirect("/parks")
		}
	});
};

//export park controller as modult

module.exports = parkController;