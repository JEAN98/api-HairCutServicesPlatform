const repository = require('../repositories/worker.repository');
const {GeneralError} = require('../utils/error');

exports.findByHairDressingSalon = async(req, res,next) => {
   try {
        let data = await repository.getWorkersByHairdressingSalon(req.query);
        res.status(200).send(data);
     } 
     catch(e) 
     {
      next( new GeneralError("Internal server error"));
    }
};
