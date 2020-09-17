const repository         = require('../repositories/hairdresserService.repository');
const {GeneralError,BadRequestSequelizeError,BadRequest,Unauthorized}  = require('../middleware/error/error');
const Sequelize = require('sequelize');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');


exports.findByHairdressingSalon = async(req, res,next) => {
    try {
        req.query.hairdressingSalonID = req.token.sub;
         let data = await repository.getByHairdressingSalon(req.query);
         res.status(200).send(data);
      } catch(error) {
        next(error)
    }
 };
 
 
 exports.create = async(req, res,next) => {
    try {
        //console.log(req.token)
        checkPermissionLevel(req.token.accountType,'HairdressingSalon');   //TODO:Unique code needs to be handle by framework(title must be unique and code as well)
        req.body.hairdressingSalonID = req.token.sub; 
        let result = await repository.create(req.body);
        res.status(200).send(result);
    } 
    catch (error) {
         next(error);
         /*
       // next(error)
        if(error instanceof Unauthorized)
        {
            next(error)
        }
        if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
            next(new BadRequestSequelizeError(error));  
        }
        else
           next(new GeneralError("Internal server error"));  */
     }
 }