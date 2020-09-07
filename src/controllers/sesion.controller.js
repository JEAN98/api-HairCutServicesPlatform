const bcrypt = require('bcrypt');
const jwt =  require('../token/jwt');
const { password_key } = require('../config/env');
const findByEmail = require('../repositories/hairdressingSalon.repository').findByEmail;
const {GeneralError,BadRequestSequelizeError}  = require('../utils/error');


exports.createSession = async(req,res,next) => {
    try {
        let body = req.body;
        console.log(body);
        let response = await checkCredentials(body.email,body.password);
        res.status(response.statusCode).json(response.message);
    } catch (error) {
        next(new GeneralError("Internal server error"));
    }
}


const checkCredentials = async(email,password) => {
    let response = {};
    response.message = {};
    let hairdressingSalonList = await findByEmail(email);
    if(hairdressingSalonList.length   > 0 )
    {
        hairdressingSalon = hairdressingSalonList[0].toJSON();
        //console.log( bcrypt.hashSync(password_key + password, 1),'passssworrdd+++')
        //console.log(hairdressingSalon.password)
        match = bcrypt.compareSync(password_key+password, hairdressingSalon.password);
        console.log('match*************',match)
        if(match) {
            response.message.token = jwt.createToken(hairdressingSalon.id,hairdressingSalon.email,hairdressingSalon.name);
            response.message.entity = deleteHairdressingSalonAttributes(hairdressingSalon);
            response.statusCode = 201;
            return response;
        }
    }
    response.message.title = "Failed to create session";
    response.message.error = "The email or password is invalid";
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
