var express        = require('express');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var validator      = require('express-validator'); // Express Validator

var config         = require('./config');
var logger         = require('./lib/logger');
var router         = require('./routes');


var app = express();


// Start Server
app.listen(config.HTTP_PORT, function connectionListener(){
	console.log('API Server running on ', config.HTTP_PORT);
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


// This will log http methods and url
app.use(logger());


// Parser JSON body Requests
app.use(bodyParser.json());

// We will use the validator after the bodyParser
app.use(validator());

// Pass app to router
router(app);