const service = require('../services/appoiment.service');
const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../middleware/error/error');
const Sequelize = require('sequelize');

exports.verifyAvailabity = async(req, res,next) => {
   try {
        let response = await service.verifyAvailabity(req.body)
        res.status(200).send(response);
     } 
     catch(e) 
     {
      next( new BadRequest(e.message));
    }
};
