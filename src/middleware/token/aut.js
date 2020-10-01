"use strict"
const env = require("../../config/env");
const token = require("jwt-simple");
const moment = require("moment");
const {Unauthorized} = require('../error/error');
const secretKey = env.secret_key;

exports.autentication = function(req, res, next) {

    if (!req.headers.authorization) {
        next( new Unauthorized("The request does not have the authentication header"))
    } else {
        var currentToken = '';
        if(req.headers.authorization.split(" ")[1])
            currentToken = req.headers.authorization.split(" ")[1]; //Postman
        else
           currentToken = req.headers.authorization.replace(/['"]+/g, ''); // Web
        //console.log(currentToken)
        try {
            var loadToken = token.decode(currentToken, secretKey, false, "HS512");
            if (loadToken.exp <= moment().unix()) {
                next( new Unauthorized("The token has expired"))
            }

        } catch (exception) {
            //console.log(exception);
            next( new Unauthorized( "The token is not valid"))
        }
        req.token = loadToken; 
        next();
    }
}
