// Load Module Dependencies
// 1. Core Modules
// 2. Third Party Modules
// 3. Local Modules

var express 	= require('express');
var bodyParser 	= require('body-parser');
var lodash      = require('lodash'); 
var mongoose	= require('mongoose');
var validator 	= require('express-validator'); // Express Validator

var config 			 = require('./config');
var logger			 = require('./lib/logger');
var router           = require('./routes');


var app = express();

var getRoot = router.getRoot;

// Listen on Port
app.listen(config.HTTP_PORT, function connectionListener(){
	console.log('Blog API Server Running on Port ', config.HTTP_PORT);
});

//Connect to MongoDB
mongoose.connect(config.MongoURL, function(err, data){ 
	if(err) {
		console.log('Error connecting to DB');
		console.log(err);
	} else {
		console.log("App is connected to DB");
	}
});

app.get('/', function getRoot(req, res) {
	res.json({
		message: 'NY Times is going Live!!!'
	})
});

// This will log http methods and url
app.use(logger());

//Authentication
//app.use(authenticate());

// Parser JSON body Requests
app.use(bodyParser.json());

// We will use the validator after the bodyParser
app.use(validator());

router(app);

