const repository = require('../repositories/appoimentService.repository');
const {GeneralError,BadRequestSequelizeError}  = require('../middleware/error/error');
const Sequelize = require('sequelize');

exports.getAppoimentServiceList = async(req, res,next) => {
   try {
        let data = await repository.getAppoimentServiceList(req.query.appoimentID);
        res.status(200).send(data);
     } catch (error) {
         next(error)
   }
};
