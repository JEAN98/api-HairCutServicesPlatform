const repository = require('../repositories/hairdressingSalon.repository');
const Sequelize = require('sequelize');
const {isEmailExist} = require('../utils/verifyEmailExist');
const JWT = require('../middleware/token/jwt');
const {JWTData} = require('../middleware/token/jwtData');
const {GeneralError,BadRequestSequelizeError, BadRequest}  = require('../utils/error');

exports.findAll = async(req, res,next) => {
   try {
        let data = await repository.get(req.query);
        res.status(200).send(data);
     } catch(e) {
       console.log(e);
       next(new GeneralError("Internal server error",500));
   }
};


exports.create = async(req, res,next) => {
   try {
       let emailExist = await isEmailExist(req.body.email);
       if(!emailExist.isEmailAccepted)
       {
          console.log(emailExist);
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
     if (error.constructor.prototype instanceof Sequelize.BaseError)
      {
         next(new BadRequestSequelizeError(error));  
      }
      else
         next(new GeneralError("Internal server error"));  
   }
}
