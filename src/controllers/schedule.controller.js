const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../middleware/error/error');
const Sequelize = require('sequelize');
exports.create = (req,res,next) => {
    try
    {
       res.status(200).send({ok:req.body});
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