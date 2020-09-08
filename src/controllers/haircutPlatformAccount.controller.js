const clientRepository                 = require('../repositories/client.repository');
const haircutPlatformAccountRepository = require('../repositories/haircutPlatformAccount.repository');
const {GeneralError,BadRequestSequelizeError}  = require('../utils/error');

exports.create = async(req, res,next) => {
   try 
   {
        //TODO: COMPLETE THE ENTIERE FUNCTION HERE
    } 
    catch(e) 
    {
        if (error.constructor.prototype instanceof Sequelize.BaseError)
        {
            next(new BadRequestSequelizeError(error));  
        }
        else
            next(new GeneralError("Internal server error"));  
    }
};


