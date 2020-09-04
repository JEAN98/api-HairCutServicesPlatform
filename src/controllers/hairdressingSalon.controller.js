const repository         = require('../repositories/hairdressingSalon.repository');
const {GeneralError}     = require('../utils/error');

exports.findAll = async(req, res,next) => {
   try {
        let data = await repository.get(req.query);
        res.status(200).send(data);
     } catch(e) {
       console.log(e);
       next(new GeneralError("Internal server error"));
   }
};


exports.create = async(req, res,next) => {
    res.status(200).send({ok:"123456789"});
}
