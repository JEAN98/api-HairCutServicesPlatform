const repository = require('../repositories/hairdressingSalon.repository');
const Sequelize = require('sequelize');
const {GeneralError,BadRequestSequelizeError}  = require('../utils/error');

exports.findAll = async(req, res,next) => {
   try {
        let data = await repository.get(req.query);
        res.status(200).send(data);
     } catch(e) {
       console.log(e);
       next(new GeneralError("Internal server error",500));
   }
};


exports.create = async(req, res,next) => {
   try {
       let result = await repository.create(req.body,next);
       res.status(200).send(result);
   } 
   catch (error) {
     if (error.constructor.prototype instanceof Sequelize.BaseError)
      {
         next(new BadRequestSequelizeError(error));  
      }
      else
         next(new GeneralError("Internal server error"));  
   }
}
