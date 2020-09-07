"use strict"
const env = require("../config/env");
const token = require("jwt-simple");
const moment = require("moment");
const {Unauthorized} = require('../utils/error');
const secretKey = env.secret_key;

exports.autentication = function(req, res, next) {

    if (!req.headers.authorization) {
        next( new Unauthorized({  message: "The request does not have the authentication header"}))
    } else {
        //var currentToken = req.headers.authorization.replace(/['"]+/g, '');
        var currentToken = req.headers.authorization.split(" ")[1];
        console.log(currentToken)
        try {
            var loadToken = token.decode(currentToken, secretKey, false, "HS512");
            if (loadToken.exp <= moment().unix()) {
                next( new Unauthorized({  message: "The token has expired" }))
            }
        } catch (exception) {
            console.log(exception);
            next( new Unauthorized({  message: "The token is not valid" }))
        }
        req.token = loadToken;
        next();
    }
}
