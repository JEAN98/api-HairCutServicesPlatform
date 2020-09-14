const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../middleware/error/error');
const Sequelize = require('sequelize');
const repository = require('../repositories/schedule.repository');
exports.create = async (req,res,next) => {
    try
    {
       let bodyResponse = await repository.create(req.body);
       res.status(201).send(bodyResponse);
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