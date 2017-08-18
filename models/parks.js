var mongoose = require('mongoose');

var ParksSchema = new mongoose.Schema({
 	name: {type: String, trim: true},
 	street: {type: String, trim: true},
 	town: {type: String, trim: true},
 	county: {type: String, trim: true},
 	state: {type: String, trim: true},
 	hours: {type: String, trim: true},
 	helmets: {type: Boolean},
 	description: {type: String, trim: true},
 	imgs: {
	 	img0: { type: String, trim: true},
	 	img1: { type: String, trim: true},
	 	img2: { type: String, trim: true},
	 	img3: { type: String, trim: true},
 	},
 	added: { type: Date, default: Date.now},
});

//export the schema

module.exports = mongoose.model('Park', ParksSchema);

 




