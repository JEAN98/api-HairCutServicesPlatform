const service = require('../services/appoiment.service');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');

exports.createAppoiment = async(req, res,next) => {
   try 
   {
      console.log(req.token.accountType)
      checkPermissionLevel(req.token.accountType,entitySelected.Client);

      req.body.clientID = req.token.sub;
      let response = await service.createAppoiment(req.body)

      res.status(201).send(response);
    } 
    catch(error) 
    {
       next(error);  
    }
};


exports.getAppoimentListBetweenDates = async(req, res,next) =>{
   try 
   {
      checkPermissionLevel(req.token.accountType,entitySelected.HSalon);
      req.query.hairdressingSalonID = req.token.sub;
      let response = await service.getAppoimentListBetweenDates(req.query);

      res.status(200).send(response);
   } 
   catch (error) 
   {
      next(error);
   }
}
