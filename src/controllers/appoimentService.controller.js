const repository = require('../repositories/appoimentService.repository');
const {GeneralError,BadRequestSequelizeError}  = require('../middleware/error/error');

exports.findAll = async(req, res,next) => {

   try {
        let data = await repository.get();
        res.status(200).send(data);
     } catch (error) {
      if (error.constructor.prototype instanceof Sequelize.BaseError)
      {
         next(new BadRequestSequelizeError(error));  
      }
      else
         next(new GeneralError("Internal server error"));  
   }
};
