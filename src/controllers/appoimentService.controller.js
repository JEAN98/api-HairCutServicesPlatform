const repository = require('../repositories/appoimentService.repository');
const {GeneralError,BadRequestSequelizeError}  = require('../middleware/error/error');
const Sequelize = require('sequelize');

exports.getAppoimentServiceList = async(req, res,next) => {
   try {
        let data = await repository.getAppoimentServiceList(req.query.appoimentID);
        res.status(200).send(data);
     } catch (error) {
      console.log(error)
      if (error.constructor.prototype instanceof Sequelize.BaseError)
      {
        
         next(new BadRequestSequelizeError(error));  
      }
      else
         next(new GeneralError("Internal server error"));  
   }
};
