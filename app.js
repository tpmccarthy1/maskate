var express = require("express");
var app = express();
var port = 3000;
app.set('view engine', 'ejs')
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//require parks routes
var parks = require('./routes/parks');
app.use('/parks', parks);

//serve client side js and css
app.use(express.static('public'));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/parks')
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));




app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});