"use strict"
const env       = require("../../config/env");
const token     = require("jwt-simple");
const moment    = require("moment");
const secretKey = env.secret_key;

exports.createToken = (jwtData) => {
    console.log(jwtData);
    var loadToken = {
        iss: "HairCutServicesPlatform",
        sub: jwtData.id,
        email: jwtData.email,
        name: jwtData.name,
        accountType: jwtData.accountType,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    }
    return token.encode(loadToken, secretKey,"HS512");
}

