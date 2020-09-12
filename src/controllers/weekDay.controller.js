const repository = require('../repositories/weekDay.respository');
const {GeneralError,BadRequestSequelizeError} = require('../utils/error');

exports.findAll = async(req, res,next) => {
   try {
        let data = await repository.findAll();
        res.status(200).send(data);
    } 
    catch(e) 
    {
       next( new GeneralError("Internal server error"));
    }
};