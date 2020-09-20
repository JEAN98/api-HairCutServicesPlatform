const service = require('../services/appoiment.service');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');

exports.createAppoiment = async(req, res,next) => {
   try 
   {
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
