const repository         = require('../repositories/hairdresserService.repository');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');


exports.findByHairdressingSalon = async(req, res,next) => {
    try {
         let data = await repository.getByHairdressingSalon(req.query);
         res.status(200).send(data);
      } catch(error) {
        next(error)
    }
 };
 
 
 exports.create = async(req, res,next) => {
    try {
        //console.log(req.token)
        checkPermissionLevel(req.token.accountType,entitySelected.HSalon);   //TODO:Unique code needs to be handle by framework(title must be unique and code as well)
        req.body.hairdressingSalonID = req.token.sub; 
        let result = await repository.create(req.body);
        res.status(201).send(result);
    } 
    catch (error) {
         next(error);
     }
 }