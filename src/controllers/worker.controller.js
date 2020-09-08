const repository = require('../repositories/worker.repository');
const Sequelize = require('sequelize');
const {GeneralError,BadRequestSequelizeError} = require('../utils/error');

exports.findByHairDressingSalon = async(req, res,next) => {
   try {
        let data = await repository.getWorkersByHairdressingSalon(req.query);
        res.status(200).send(data);
     } 
     catch(e) 
     {
      next( new GeneralError("Internal server error"));
    }
};

exports.create = async(req,res,next) => {
   try
   {
      let data = await repository.create(req.body);
      res.status(200).send(data);
   } 
   catch (error) {
      console.log(error)
      if (error.constructor.prototype instanceof Sequelize.BaseError)
      {
         next(new BadRequestSequelizeError(error));  
      }
      else
         next(new GeneralError("Internal server error"));  
   }
}
