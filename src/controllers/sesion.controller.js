const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const JWT = require('../middleware/token/jwt');
const {JWTData} = require('../middleware/token/jwtData');
const { password_key } = require('../config/env');
const findByEmail = require('../repositories/hairdressingSalon.repository').findByEmail;
const {GeneralError,BadRequestSequelizeError}  = require('../middleware/error/error');


exports.createSession = async(req,res,next) => {
    try {
        let body = req.body;
        console.log(body);
        let response = await checkCredentials(body.email,body.password);
        res.status(response.statusCode).json(response.message);
    }  catch (error) {
        console.log(error)
        if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
           next(new BadRequestSequelizeError(error));  
        }
        else
           next(new GeneralError("Internal server error"));  
     }
}
//TODO: Needs to be fixed in order to handle client credentials

const checkCredentials = async(email,password) => {
    let response = {};
    response.message = {};
    let hairdressingSalonList = await findByEmail(email);
   
    if(hairdressingSalonList.length > 0 )
    {
        hairdressingSalon = hairdressingSalonList[0].toJSON();
        //console.log( bcrypt.hashSync(password_key + password, 1),'passssworrdd+++')
        //console.log(hairdressingSalon.password)
        match = bcrypt.compareSync(password_key+password, hairdressingSalon.password);
        console.log('match*************',match)
        if(match) {
            let jwtData = new JWTData(hairdressingSalon.id,hairdressingSalon.email,hairdressingSalon.name,'HairdressingSalon');
            response.message.token = jwt.createToken(jwtData);
            response.message.entity = deleteHairdressingSalonAttributes(hairdressingSalon);
            response.statusCode = 201;
            return response;
        }
    }
    response.message.title = "Failed to create session";
    response.message.error = "The email or password are invalid";
    response.statusCode = 401;  
    console.log(response);
    return response;
}


const deleteHairdressingSalonAttributes = (hairdressingSalon) => {
    delete hairdressingSalon.password;
    delete hairdressingSalon.createdAt;
    delete hairdressingSalon.updatedAt;
    delete hairdressingSalon.gender_id; 
    return hairdressingSalon;
}
