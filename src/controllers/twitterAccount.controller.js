const repository = require('../repositories/twitterAccount.repository');
const {GeneralError,BadRequestSequelizeError,BadRequest}  = require('../middleware/error/error');
const {createClientRerefence,getMappedAccountWithClient} = require('../utils/clientMapper');
const {JWTData} = require('../middleware/token/jwtData')
const JWT = require('../middleware/token/jwt');

exports.create = async(req, res,next) => {
   try 
   {
        let twitterIDExist = await repository.findBytwitterID(req.body.twitterID);
        if(twitterIDExist.length > 0)
        {
            next(new BadRequest( {error:'twitterID already exists'}));  
        }
        else
        {
            let newAccount = req.body;
            //FIXME: Needs to be improved
            newAccount.firstName = req.body.username;
            newAccount.lastName = '';
            newAccount.genderID = 1;
            let client = await createClientRerefence(newAccount,true);
            newAccount.clientID = client.id;

            accountCreated = await repository.create(newAccount);
            
            let clientMapped = getMappedAccountWithClient(client,accountCreated);
            let fullName = accountCreated.username;
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