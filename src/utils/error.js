class GeneralError extends Error {
  constructor(message,statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class BadRequest extends GeneralError { 
  constructor(message){
    super( message,400);
  }
}

class BadRequestSequelizeError extends GeneralError { 
  constructor(message){
    if(message.errors !== undefined)
    {
      message.errors[0].instance = null;
      message =   message.errors[0];
    }
    super( message,400);
  }
}

class NotFound extends GeneralError { 
  constructor(message){
    super(message,404);
  }
}


module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  BadRequestSequelizeError
};