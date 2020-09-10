const haircutPlatformAccountRepository = require('../repositories/haircutPlatformAccount.repository');
const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../utils/error');
const {createClientRerefence,getMappedAccountWithClient} = require('./helpers/clientHelper');
const Sequelize = require('sequelize');
const {isEmailExist} = require('../utils/verifyEmailExist');


exports.create = async(req, res,next) => {
   try 
    { 
        let emailExist = await isEmailExist(req.body.email);
        if(!emailExist.isEmailAccepted)
        {
            next(new BadRequest(emailExist));  
        }
        else{
            let newAccount = req.body;
            let client = await createClientRerefence(newAccount,false);
            newAccount.clientID = client.id;
  
            accountCreated = await haircutPlatformAccountRepository.create(newAccount);
            
            let bodyResponse = getMappedAccountWithClient(client,accountCreated);
            res.status(200).send(bodyResponse);
        }
    } 
    catch(error) 
    {
        if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
            next(new BadRequestSequelizeError(error));  
        }
        else
            next(new GeneralError("Internal server error"));  
    }
};






