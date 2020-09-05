'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errrorHandler');

const app = express();


app.use(bodyParser.json())
//load routes
require('./routes/gender.route')(app); 
require('./routes/hairdresserService.route')(app); 
require('./routes/hairdressingSalon.route')(app);
require('./routes/appoimentService.route')(app); 
require('./routes/worker.route')(app); 



// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json



// Enable CORS ()
/*
if(config.MODE == 'development') {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
} */



app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  })

// error handler middleware
app.use(errorHandler)

// Create a Server
app.listen(3000)

/*
app.get('/error', function(req, res) {
    throw new ErrorHandler(500, 'Internal server error');
})
*/

//module.exports = app;