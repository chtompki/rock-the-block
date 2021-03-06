// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var chain = require('chain-wallets-node');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bithack'); // connect to our database

var port = process.env.PORT || 8080;        // set our port


// Routes
var router = express.Router();              // get an instance of the express Router
require('./routes/status')(router);
require('./routes/user')(router);
require('./routes/wallet')(router);

// Models
var User     = require('./models/user');
var Wallet     = require('./models/wallet');

app.use(function(req, res, next) {
    // do logging
    console.log(req.method+" "+req.url);
    next();
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);