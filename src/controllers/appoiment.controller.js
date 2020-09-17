const service = require('../services/appoiment.service');
const {GeneralError,BadRequestSequelizeError,BadRequest,Unauthorized}  = require('../middleware/error/error');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
exports.createAppoiment = async(req, res,next) => {
   try 
   {
      checkPermissionLevel(req.token.accountType,'ClientAccount',next);

      req.body.clientID = req.token.sub;
      let response = await service.createAppoiment(req.body)

      res.status(201).send(response);
    } 
    catch(error) 
    {
        next(error)
    }
};
