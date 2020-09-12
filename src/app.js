'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errrorHandler');
const {getFilesName} = require('./utils/getFilesInDirectory');

const app = express();

app.use(bodyParser.json())


//load routes
let routeList = getFilesName('./src/routes/');
routeList.forEach(fileData => {
  //console.log(pathModels +fileData.fileName)
  var pathFileRoute = './routes/' +fileData.fileName;
   require(pathFileRoute )(app);
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
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


// error handler middleware
app.use(errorHandler)

// Create a Server
app.listen(3000)


//module.exports = app;