const repository = require('../repositories/gender.respository');
const {GeneralError,BadRequestSequelizeError}  = require('../utils/error');

exports.findAll = async(req, res,next) => {
   try 
   {
      let data = await repository.get();
      res.status(200).send(data);
  } 
   catch(e) {
   if (error.constructor.prototype instanceof Sequelize.BaseError)
   {
      next(new BadRequestSequelizeError(error));  
   }
   else
      next(new GeneralError("Internal server error"));  
   }
};
