const service = require('../services/appoiment.service');
const {GeneralError,BadRequestSequelizeError,BadRequest,Unauthorized}  = require('../middleware/error/error');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {Sequelize} = require('sequelize');
exports.createAppoiment = async(req, res,next) => {
   try 
   {
      checkPermissionLevel(req.token.accountType,'ClientAccount');

      req.body.clientID = req.token.sub;
      let response = await service.createAppoiment(req.body)

      res.status(201).send(response);
    } 
    catch(error) 
    {
        console.log(error instanceof GeneralError)
        if(error instanceof Unauthorized)
        {
            next(error)
        }
       else if(error instanceof BadRequest)
        {
            next(error)
        }
       else if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
            next(new BadRequestSequelizeError(error));  
        }
        else
        {
            next(error);  
        }
           
    }
};
