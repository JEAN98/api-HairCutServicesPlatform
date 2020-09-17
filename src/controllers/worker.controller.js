const repository = require('../repositories/worker.repository');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');

exports.findByHairDressingSalon = async(req, res,next) => {
   try {
        req.query.hairdressingSalonID = req.token.sub;
        let data = await repository.getWorkersByHairdressingSalon( req.query);
        res.status(200).send(data);
     } 
     catch(error) 
     {
      next(error);
    }
};

exports.create = async(req,res,next) => {
   try
   {
      checkPermissionLevel(req.token.accountType,'HairdressingSalon');

      req.body.hairdressingSalonID = req.token.sub
      let data = await repository.create(req.body);
      res.status(200).send(data);
   } 
   catch (error) {
      next(error);
   }
}
