const {  ValidationError } = require('express-validation');
const {GeneralError,BadRequestSequelizeError,BadRequest,Unauthorized}  = require('./error');
const {Sequelize} = require('sequelize');

const errorHandler = (error, req, res, next) => {
    //TODO:IT COULD BE BETTER
   console.log(error,'errorhandlerLog')
  //TODO: ForeignKeyConstraintError  NEEDS TO BE PART OF THE ERROR
  if(error.name && (error.name === 'SequelizeUniqueConstraintError' || error.name === 'ValidationError' || error.name === 'SequelizeForeignKeyConstraintError' ))
  {
    console.log('ErrorTriggeredBySequelize')
    let sequelizeError = new BadRequestSequelizeError(error);
      return res.status(sequelizeError.statusCode).json({
        status: 'error',
        details: sequelizeError.message
      });
  }
 else if(error.constructor.prototype instanceof Sequelize.BaseError)
  {
    console.log('ErrorTriggeredBySequelize. Unhandle error')
      return res.status(500).json({
        status: 'error',
        details: 'Internal server error'
      });
  }
 
  else if(error instanceof ValidationError)
  {
    return res.status(error.statusCode).json(error)
  }
  
  else if(error instanceof GeneralError)
  {
    return res.status(error.statusCode).json({
      status: 'error',
      details: error.message
    });
  }

  else{
    return res.status(500).json({
      status: 'error',
      details: 'Internal server error'
    });
  }
    
}

module.exports = errorHandler;