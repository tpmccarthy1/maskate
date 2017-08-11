var mongoose = require('mongoose');

var ParksSchema = new mongoose.Schema({
 	name: {type: String, required: true, trim: true},
 	street: {type: String, required: true, trim: true},
 	town: {type: String, required: true, trim: true},
 	county: {type: String, required: true, trim: true},
 	state: {type: String, required: true, trim: true},
 	hours: {type: String, required: true, trim: true},
 	helmets: {type: Boolean, required: true},
 	description: {type: String, required: true, trim: true},
 	img: { data: Buffer, contentType: String },
 	added: { type: Date, default: Date.now},
});

//export the schema

module.exports = mongoose.model('Park', ParksSchema);