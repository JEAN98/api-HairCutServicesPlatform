const repository = require('../repositories/facebookAccount.repository');
const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../middleware/error/error');
const {isEmailExist} = require('../utils/verifyEmailExist');
const {createClientRerefence,getMappedAccountWithClient} = require('../utils/clientMapper');
const {JWTData} = require('../middleware/token/jwtData')
const JWT = require('../middleware/token/jwt');

exports.create = async(req, res,next) => {
   try 
   {
        let emailExist = await isEmailExist(req.body.email);
        if(!emailExist.isEmailAccepted)
        {
            next(new BadRequest(emailExist));  
        }
        else
        {
            let newAccount = req.body;
            let client = await createClientRerefence(newAccount,true);
            newAccount.clientID = client.id;

            accountCreated = await repository.create(newAccount);
            
            let clientMapped = getMappedAccountWithClient(client,accountCreated);
            let fullName = clientMapped.firstName +" " + clientMapped.lastName;
            let jwtData = new JWTData(clientMapped.clientID,clientMapped.email,fullName,'ClientAccount');
            let token = JWT.createToken(jwtData);

            res.status(201).send({client: clientMapped, token: token});
        }
    } 
    catch (error) 
    {
       next(error)
    }
};