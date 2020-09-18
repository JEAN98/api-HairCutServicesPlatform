'use strict'
const express = require('express');
// load all env variables from .env file into process.env object.
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error/errrorHandler');
const {getFilesName} = require('./utils/getFilesInDirectory');
const PORT = process.env.PORT || 3000;
const app = express();



//BodyParser
app.use(bodyParser.json())


//load routes
let routeList = getFilesName('./src/routes/');
routeList.forEach(fileData => {
  //console.log(pathModels +fileData.fileName)
  var pathFileRoute = './routes/' +fileData.fileName;
   require(pathFileRoute )(app);
});

app.get('/', (req, res) => res.send(process.env.API_NAME))



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 


//Capture All 404 errors
app.use(function (req,res,next){
	res.status(404).send({ title:'Not found' ,message: 'Unable to find the requested resource!',status: 404});
});

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

console.log(process.env.API_NAME)

// Create a Server
//app.listen(3000)
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))




//module.exports = app;