const {  ValidationError } = require('express-validation');
const { GeneralError } = require('./error');

const errorHandler = (err, req, res, next) => {
  if(err instanceof ValidationError)
  {
    return res.status(err.statusCode).json(err)
  }
  else if(err instanceof GeneralError)
  {
    return res.status(err.statusCode).json({
      status: 'error',
      details: err.message
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