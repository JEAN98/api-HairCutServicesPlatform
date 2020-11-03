const { BadRequest } = require('../middleware/error/error');
const repository         = require('../repositories/hairdresserService.repository');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');


exports.findByHairdressingSalon = async(req, res,next) => {
    try {

        if(req.token.accountType === entitySelected.HSalon)
        {
            req.query.hairdressingSalonID = req.token.sub;   
        }
        else{
            if( req.query.hairdressingSalonID == null)
                throw new BadRequest('HairdressingSalonID needs to be selected for clients');
        }
         let data = await repository.getByHairdressingSalon(req.query);
         res.status(200).send(data);
      } catch(error) {
        next(error)
    }
 };
 
 //TODO: HighPriority TITLE AND CODE MUST BE UNIQUE ONLY BY HSALON, and not in a global level
 exports.create = async(req, res,next) => {
    try {
        //console.log(req.token)
        checkPermissionLevel(req.token.accountType,entitySelected.HSalon);   
        req.body.hairdressingSalonID = req.token.sub; 
        let newService = req.body;
        await isTitleOrCodeAlreadyBeingUsed(newService.title,newService.code,newService.hairdressingSalonID);
        let result = await repository.create(newService);
        res.status(201).send(result);
    } 
    catch (error) {
         next(error);
     }
 }

 const isTitleOrCodeAlreadyBeingUsed = async(title,code,hairdressingSalonID) => {
    let result = await repository.isTitleOrCodeAlreadyBeingUsed(title,code,hairdressingSalonID);
    if(result.length > 0)
    {
        throw new BadRequest('El título o nombre del código ya se encuentra registrados. Por favor intentarlo con nombres nuevos');
    }
   
 }