const { Joi } = require('express-validation')

const createTwitterAccount = {
    body: Joi.object({
    username: Joi.string().max(250).required(),
    token: Joi.string().max(300).required(),
    twitterID: Joi.string().max(500).required(),
    }),
}

module.exports = createTwitterAccount;