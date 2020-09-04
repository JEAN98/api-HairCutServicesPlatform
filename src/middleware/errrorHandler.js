const { GeneralError } = require('../utils/error');
const {  ValidationError } = require('express-validation');

const errorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    });
  }

  else if(err instanceof ValidationError)
  {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json({
    status: 'error',
    message: err.message
  });
}



module.exports = errorHandler;