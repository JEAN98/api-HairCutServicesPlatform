const {GeneralError,BadRequestSequelizeError,BadRequest,Unauthorized}  = require('../middleware/error/error');
const Sequelize = require('sequelize');
const repository = require('../repositories/schedule.repository');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');

exports.create = async (req,res,next) => {
    try
    {
       checkPermissionLevel(req.token.accountType,'HairdressingSalon');
       let bodyResponse = await repository.create(req.body);
       res.status(201).send(bodyResponse);
    } 
    catch (error) {
         next(error)
    }
}