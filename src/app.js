'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();
const errorHandler = require('./middleware/errrorHandler');


//load routes
require('./routes/gender.route')(app); 
require('./routes/hairdressingSalon.route')(app); 
require('./routes/appoimentService.route')(app); 
require('./routes/worker.route')(app); 



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// Enable CORS ()
if(config.MODE == 'development') {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
}

app.get('/', function (req, res) {
    res.send('NodeRestAPi is running');
});


// error handler middleware
app.use(errorHandler);

// Create a Server
var server = app.listen(3000, function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("NodeRestAPi is running at http://%s:%s", host, port)
});

/*
app.get('/error', function(req, res) {
    throw new ErrorHandler(500, 'Internal server error');
})
*/

module.exports = app;