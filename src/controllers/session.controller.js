const bcrypt = require('bcrypt');
const JWT = require('../middleware/token/jwt');
const {JWTData} = require('../middleware/token/jwtData');
const { password_key } = require('../config/env');
const twitterAccfindBytwitterID = require('../repositories/twitterAccount.repository').findBytwitterID;
const facebookAccountfindByEmail = require('../repositories/facebookAccount.repository').findByEmail;
const hairdressingSalonfindByEmail = require('../repositories/hairdressingSalon.repository').findByEmail;
const haircutPlatformAccountfindByEmail = require('../repositories/haircutPlatformAccount.repository').findByEmail;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemovedHS = ['createdAt','updatedAt','password','gender_id'];
const attributesToBeRemovedClient = ['createdAt','updatedAt','password','client','client_id','facebookID','token','twitterID'];
const clientMapper = require('../utils/clientMapper');


exports.createHairdressingSalonSession = async(req,res,next) => {
    try 
    {
        let body = req.body;
        let response = await checkHairdressingSalonCredentials(body.email,body.password);
        res.status(response.statusCode).json(response.message);
    }  
    catch (error) 
    {
        next(error)
    }
}

const checkHairdressingSalonCredentials = async(email,password) => {
    let response = {};
    response.message = {};
    let hairdressingSalonList = await hairdressingSalonfindByEmail(email);
   
    if(hairdressingSalonList.length > 0 )
    {
       let hairdressingSalon = hairdressingSalonList[0].toJSON();
        match = bcrypt.compareSync(password_key+password, hairdressingSalon.password);
        //console.log('match*************',match)
        if(match) {
            let jwtData = new JWTData(hairdressingSalon.id,hairdressingSalon.email,hairdressingSalon.name,'HairdressingSalon');

            response.message.hairdressingSalon = cleanHelper.cleanEntity(hairdressingSalon,attributesToBeRemovedHS);
            response.message.token = JWT.createToken(jwtData);
            response.statusCode = 201;

            return response;
        }
    }
    return buildErrorMessage();
}

const buildErrorMessage = () => {
    return {
        message:{
            title: 'Failed to create session',
            error: 'The email or password are invalid'
        },
        statusCode: 401
    };
}


exports.createHaircutPlatformAccountSession = async(req,res,next) => {
    try {
        let body = req.body;
        let response = await checkHaircutPlatformAccountCredentials(body.email,body.password);

        res.status(response.statusCode).json(response.message);
    }  catch (error) {
        next(error)
     }
}

const checkHaircutPlatformAccountCredentials = async(email,password) => {
    let response = {};
    response.message = {};
    let accountList = await haircutPlatformAccountfindByEmail(email);

    if(accountList.length > 0 )
    {
        let account = accountList[0].toJSON();
        match = bcrypt.compareSync(password_key+password, account.password);
        if(match) {

            return buildClientCrendetials(account,response);
        }
    }
    return buildErrorMessage();
}

const buildClientCrendetials = (account,response) => {
    let fullName = account.client.firstName + ' ' + account.client.lastName;
    let jwtData = new JWTData(account.clientID,account.email,fullName,'ClientAccount');

    account = clientMapper.getMappedAccountWithClient(account.client, account);

    response.message.client = cleanHelper.cleanEntity(account,attributesToBeRemovedClient)
    response.message.token = JWT.createToken(jwtData);
    response.statusCode = 201;

    return response;
}


exports.createFacebookAccountSession = async(req,res,next) =>
{
    try {
        let body = req.body;
        let accountList =  await facebookAccountfindByEmail(body.email)
        let response = await checkFacebookCredentials(body.id,accountList);

        res.status(response.statusCode).json(response.message);
    }  catch (error) {
        next(error)
     }
}

const checkFacebookCredentials = async(id,accountList) => 
{
    //id => facebookID
    let response = {};
    response.message = {};

    if(accountList.length > 0 )
    {
        let account = accountList[0].toJSON();
        if(account.facebookID == id) 
        {
            return buildClientCrendetials(account,response);
        }
    }
    return buildErrorMessage();
}


exports.createTwitterAccountSession = async(req,res,next) =>
{
    try {
        let body = req.body;
        let accountList =  await twitterAccfindBytwitterID(body.twitterID)
        let response = await checkTwitterCredentials(body.twitterID,accountList);

        res.status(response.statusCode).json(response.message);
    }  catch (error) {
        next(error)
     }
}


const checkTwitterCredentials = async(id,accountList) => 
{
    //id => facebookID
    let response = {};
    response.message = {};

    if(accountList.length > 0 )
    {
        let account = accountList[0].toJSON();
        if(account.twitterID == id) 
        {
            return buildClientCrendetials(account,response);
        }
    }
    return {
        message:{
            title: 'Failed to create session',
            error: 'The username or twitterID are invalid or does not exist'
        },
        statusCode: 401
    };
}