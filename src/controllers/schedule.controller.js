const {GeneralError,BadRequestSequelizeError,BadRequest,Unauthorized}  = require('../middleware/error/error');
const repository = require('../repositories/schedule.repository');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');


exports.create = async (req,res,next) => {
    try
    {
       checkPermissionLevel(req.token.accountType,entitySelected.HSalon);  
       let bodyResponse = await repository.create(createScheduleList(req.body,req.token.sub));
       res.status(201).send(bodyResponse);
    } 
    catch (error) {
         next(error)
    }
}

function createScheduleList(scheduleList,hairdressingSalonID) {
    if(scheduleList.length > 0)
    {
        for (let index = 0; index < scheduleList.length; index++) {
                scheduleList[index].hairdressingSalonID = hairdressingSalonID;
        }
        return scheduleList;
    }
    else{
        throw new BadRequest('The Schedule list cannot be empty');
    }
}