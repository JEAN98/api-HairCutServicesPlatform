const repository = require('../repositories/gender.respository');
const {GeneralError,BadRequestSequelizeError}  = require('../middleware/error/error');
const Sequelize = require('sequelize');

exports.findAll = async(req, res,next) => {
   try 
   {
      let data = await repository.get();
      res.status(200).send(data);
  } 
   catch(error) {
      next(error)
   }
};
