const { GeneralError } = require('../utils/error');
const sequelizeValidationError = require('sequelize').ValidationError;
const expressValidation = require('express-validation').ValidationError;

const errorHandler = (err, req, res, next) => {
  console.log(err.constructor.name)

    return res.status(err.statusCode).json({
      status: 'error',
      details: err.message
    });


 if(err instanceof expressValidation)
  {
    return res.status(err.statusCode).json(err)
  }

  if(err instanceof sequelizeValidationError)
  {
    //errorList = 
    err.details.errors[0].instance = null;
    return res.status(400).json( err.details.errors[0]);
  }

  return res.status(500).json({
    status: 'error',
    details: err.message
  });
}



module.exports = errorHandler;