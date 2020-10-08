const { Joi } = require('express-validation')

const createJWTPlatformAccounts = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
}

const createJWTFacebookAccounts = {
    body: Joi.object({
        email: Joi.string().email().required(),
        id: Joi.string().required(),
    }),
}

const createJWTTwitterAccounts = {
    body: Joi.object({
        username: Joi.string().required(),
        twitterID: Joi.string().required(),
    }),
}

module.exports = 
{
    createJWTPlatformAccounts,
    createJWTFacebookAccounts,
    createJWTTwitterAccounts
};