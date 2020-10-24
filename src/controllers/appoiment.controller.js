const service = require('../services/appoiment.service');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');
const {BadRequest} = require('../middleware/error/error');

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


exports.getAppoimentsByClient = async(req, res,next) => {
   try 
   {
      checkPermissionLevel(req.token.accountType,entitySelected.Client);
      let clientID = req.token.sub;
      let response = await service.getAppoimentsByClient(clientID);

      res.status(200).send(response);
   } 
   catch (error) 
   {
      next(error);
   }
}


exports.deleteAppoiment = async(req,res,next) => {
   try {
      checkPermissionLevel(req.token.accountType,entitySelected.Client);
      if(isNaN(req.params.id ))
      {
         throw new BadRequest('El id de la cita debe ser un número entero');
      }
      await service.deleteAppoiment(req.params.id);

      res.status(204).send();
   } catch (error) {
      next(error);
   }
}
