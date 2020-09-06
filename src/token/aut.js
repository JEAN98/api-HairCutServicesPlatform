"use strict"
const env = require("../config/env");
const token = require("jwt-simple");
const moment = require("moment");
const secretKey = env.secret_key;

exports.autentication = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ mensaje: "The request does not have the authentication header" })
    } else {

        var currentToken = req.headers.authorization.replace(/['"]+/g, '');
      //var currentToken = req.headers.authorization.split(" ")[1];

        try {
            var loadToken = token.decode(currentToken, secretKey, false, "HS512");
            if (loadToken.exp <= moment().unix()) {
                return res.status(403).send({ mesage: "The token has expired" });
            }
        } catch (exception) {
            console.log(exception);
            return res.status(403).send({ mesage: "The token is not valid" });

        }
        req.userToken = loadToken;

        next();
    }
}
