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
     // TODO:Needs to remove arrary of errors
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
  NotFound
};