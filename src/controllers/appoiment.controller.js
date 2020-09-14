const service = require('../services/appoiment.service');
const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../middleware/error/error');
const Sequelize = require('sequelize');

exports.createAppoiment = async(req, res,next) => {
   try {
        let response = await service.createAppoiment(req.body)
        res.status(200).send(response);
     } 
     catch(e) 
     {
       next( new BadRequest(e.message));
     }
};
