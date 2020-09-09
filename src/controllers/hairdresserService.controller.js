const repository         = require('../repositories/hairdresserService.repository');
const {GeneralError,BadRequestSequelizeError}     = require('../utils/error');
const Sequelize = require('sequelize');


exports.findByHairdressingSalon = async(req, res,next) => {
    try {
         let data = await repository.getByHairdressingSalon(req.query);
         res.status(200).send(data);
      } catch(e) {
        console.log(e);
        next(new GeneralError("Internal server error"));
    }
 };
 
 
 exports.create = async(req, res,next) => {
    try {
        let result = await repository.create(req.body);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
           next(new BadRequestSequelizeError(error));  
        }
        else
           next(new GeneralError("Internal server error"));  
     }
 }