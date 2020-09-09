const haircutPlatformAccountRepository = require('../repositories/haircutPlatformAccount.repository');
const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../utils/error');
const clientRepository = require('../repositories/client.repository');
const {getClientObject} = require('../utils/readClientProperties');
const Sequelize = require('sequelize');
const {isEmailExist} = require('../utils/verifyEmailExist');


exports.create = async(req, res,next) => {
   try 
    { 
        let emailExist = await isEmailExist(req.body.email);
        if(!emailExist.isEmailAccepted)
        {
            console.log(emailExist);
            next(new BadRequest(emailExist));  
        }
        let newAccount = req.body;
        let clientObject = getClientObject(newAccount);
        clientObject.isSoccialAccount = true;

        let client = await clientRepository.create(clientObject);
        newAccount.clientID = client.id;

        accountCreated = await haircutPlatformAccountRepository.create(newAccount);

        res.status(200).send(accountCreated);
    } 
    catch(error) 
    {
        console.log(error);
        console.log("errrorrr here",error.constructor.prototype)
        if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
            console.log("errrorrr here3")
            next(new BadRequestSequelizeError(error));  
        }
        else
            next(new GeneralError("Internal server error"));  
    }
};



