const repository = require('../repositories/worker.repository');
const {GeneralError,BadRequestSequelizeError,BadRequest,Unauthorized}  = require('../middleware/error/error');
const Sequelize = require('sequelize');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');

exports.findByHairDressingSalon = async(req, res,next) => {
   try {
        req.query.hairdressingSalonID = req.token.sub;
        let data = await repository.getWorkersByHairdressingSalon( req.query);
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
      checkPermissionLevel(req.token.accountType,'HairdressingSalon');

      req.body.hairdressingSalonID = req.token.sub
      let data = await repository.create(req.body);
      res.status(200).send(data);
   } 
   catch (error) {
      if(error instanceof Unauthorized)
      {
          next(error)
      }
      if (error.constructor.prototype instanceof Sequelize.BaseError)
      {
         next(new BadRequestSequelizeError(error));  
      }
      else
         next(new GeneralError("Internal server error",500));  
   }
}
