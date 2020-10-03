const { Joi } = require('express-validation')

const createFacebookAccount = {
    body: Joi.object({
    firstName: Joi.string().max(100).required(),
    token: Joi.string().max(300).required(),
    facebookID: Joi.number().strict().integer().required(),
    lastName: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    age: Joi.number().strict().integer().required(),
    genderID: Joi.number().strict().integer().required()
    }),
}

module.exports = createFacebookAccount;