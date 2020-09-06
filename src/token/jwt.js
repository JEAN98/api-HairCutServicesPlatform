"use strict"
const env       = require("../config/env");
const token     = require("jwt-simple");
const moment    = require("moment");
const secretKey = env.secret_key;

exports.createToken = (id, email, name) => {
    var loadToken = {
        iss: "HairCutServicesPlatform",
        sub: id,
        email: email,
        name: name,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    }
    return token.encode(loadToken, secretKey,"HS512");
}
