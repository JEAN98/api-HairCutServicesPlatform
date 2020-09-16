const { Joi } = require('express-validation')

const createJWTPlatformAccounts = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
}

module.exports = 
{
    createJWTPlatformAccounts
};