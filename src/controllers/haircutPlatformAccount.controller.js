const haircutPlatformAccountRepository = require('../repositories/haircutPlatformAccount.repository');
const {GeneralError,BadRequestSequelizeError}  = require('../utils/error');
const clientRepository = require('../repositories/client.repository');
const {getClientObject} = require('../utils/readClientProperties');

exports.create = async(req, res,next) => {
   try 
   {
       let newAccount = req.body;
       let clientObject = getClientObject(newAccount);
       clientObject.isSoccialAccount = true;

        let client = await clientRepository.create(clientObject);
        newAccount.clientID = client.id;

        accountCreated = await haircutPlatformAccountRepository.create(newAccount);
        res.status(200).send(accountCreated);
    } 
    catch(e) 
    {
        console.log(e);
        if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
            next(new BadRequestSequelizeError(error));  
        }
        else
            next(new GeneralError("Internal server error"));  
    }
};


