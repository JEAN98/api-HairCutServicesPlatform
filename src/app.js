'use strict'

const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//mongoose.connect(config.CONNECTION_STRING);

//load models
//const User = require('./models/user');

//load routes
require('./routes/gender.route')(app); 
require('./routes/hairdressingSalon.route')(app); 
//const userRoute = require('./routes/user-route');

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

// Create a Server
var server = app.listen(3000, function () {
 
    var host = server.address().address
    var port = server.address().port
   
    console.log("NodeRestAPi is running at http://%s:%s", host, port)
})
  


app.get('/', function (req, res) {
    res.send('NodeRestAPi is running');
});


//app.use('/users', userRoute);

module.exports = app;