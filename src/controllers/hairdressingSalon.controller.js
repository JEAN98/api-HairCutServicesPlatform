const repository = require('../repositories/hairdressingSalon.repository');
const scheduleRepository = require('../repositories/schedule.repository');
const {isEmailExist} = require('../utils/verifyEmailExist');
const JWT = require('../middleware/token/jwt');
const {JWTData} = require('../middleware/token/jwtData');
const { BadRequest}  = require('../middleware/error/error');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');

exports.findAll = async(req, res,next) => {
   try {
        let data = await repository.get(req.query);
        res.status(200).send(data);
     } catch(e) {
       next(e);
   }
};


exports.findByID = async(req, res,next) => {
  try {
      checkPermissionLevel(req.token.accountType,entitySelected.Client);   
      console.log(req.params.id)
       let data = await repository.findHsalonByID(req.params.id);
       data.scheduleList = await scheduleRepository.getByHairdressingSalon(req.params.id);
       res.status(200).send(data);
    } catch(e) {
      next(e);
  }
};



exports.create = async(req, res,next) => {
   try {
       let emailExist = await isEmailExist(req.body.email);
       if(!emailExist.isEmailAccepted)
       {
          next(new BadRequest(emailExist));  
       }
       else{
         let newHairdressingSalon = await repository.create(req.body,next);
         let jwtData = new JWTData(newHairdressingSalon.id,newHairdressingSalon.email,newHairdressingSalon.name,'HairdressingSalon');
         let token = JWT.createToken(jwtData);
         let response = {
           hairdressingSalon: newHairdressingSalon,
           token: token
         };
         res.status(201).send(response);
       }
      
   } 
   catch (error) {
     next(error);
   }
}
