const repository = require('../repositories/hairdressingSalon.repository');
const Sequelize = require('sequelize');
const {isEmailExist} = require('../utils/verifyEmailExist');
const JWT = require('../middleware/token/jwt');
const {JWTData} = require('../middleware/token/jwtData');
const {GeneralError,BadRequestSequelizeError, BadRequest}  = require('../middleware/error/error');

exports.findAll = async(req, res,next) => {
   try {
        let data = await repository.get(req.query);
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
