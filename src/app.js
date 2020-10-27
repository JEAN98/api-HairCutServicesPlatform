'use strict'
const express = require('express');
// load all env variables from .env file into process.env object.
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error/errrorHandler');
const {getFilesName} = require('./utils/getFilesInDirectory');
//const PORT = process.env.PORT || 3000;
const app = express();



//BodyParser
//app.use(bodyParser.json())

app.use(bodyParser.json({limit: "50mb"}));


//load routes
let routeList = getFilesName('./src/routes/');
routeList.forEach(fileData => {
  //console.log(pathModels +fileData.fileName)
  var pathFileRoute = './routes/' +fileData.fileName;
   require(pathFileRoute )(app);
});

app.get("/", (req, res) => {
    res.status(200).send(process.env.API_NAME);
  });



// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


//Capture All 404 errors
app.use(function (req,res,next){
	res.status(404).send({ title:'Not found' ,message: 'Unable to find the requested resource!',status: 404});
});

// Enable CORS ()

if(process.env.CURRENT_ENV == 'Dev') {
  console.log('CorsEnable in Dev env')
  var cors = require('cors')
  app.use(cors())
} 


// error handler middleware
app.use(errorHandler)



// Create a Server
//app.listen(3000)
//app.listen(PORT, () => //console.log(`Listening on ${ PORT }`))
//
//app.listen(PORT)



module.exports = app;